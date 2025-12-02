import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/Button'
import { UiText } from '@/components/ui/Text'
import { importFromUrl } from '@/lib/api/import-from-url'
import { searchOnline, type SearchResult } from '@/lib/api/search-online'
import { SEARCH_ONLINE_ENABLED } from '@/lib/flags'
import { setImportDraft } from '@/lib/storage/import-draft'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { Alert, FlatList, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SearchOnlineScreen() {
    const router = useRouter()
    const [term, setTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<SearchResult[]>([])

    const canSearch = useMemo(
        () => SEARCH_ONLINE_ENABLED && term.trim().length > 1,
        [term]
    )

    async function runSearch() {
        if (!SEARCH_ONLINE_ENABLED) return
        const q = term.trim()
        if (!q) return
        setLoading(true)
        try {
            const res = await searchOnline(q)
            setResults(res)
        } catch (e) {
            console.warn(e)
            Alert.alert('Search failed', 'This feature is a client stub only.')
        } finally {
            setLoading(false)
        }
    }

    if (!SEARCH_ONLINE_ENABLED) {
        return (
            <SafeAreaView style={{ flex: 1, padding: 16 }}>
                <UiText variant="title">Search online</UiText>
                <View style={{ height: 8 }} />
                <UiText>
                    This preview screen is gated behind a feature flag and is
                    currently disabled. Set EXPO_PUBLIC_SEARCH_ONLINE=true to
                    enable the client stub.
                </UiText>
            </SafeAreaView>
        )
    }

    console.log('resuts:', results)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    paddingHorizontal: 16,
                    paddingTop: 8,
                    paddingBottom: 4,
                }}
            >
                <UiText variant="title">Search online</UiText>
            </View>
            <SearchBar
                value={term}
                onChange={setTerm}
                onClear={() => {
                    setTerm('')
                    setResults([])
                }}
                placeholder="Search title or artist…"
            />
            <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
                <Button
                    title={loading ? 'Searching…' : 'Search'}
                    onPress={runSearch}
                    disabled={!canSearch || loading}
                    loading={loading}
                />
            </View>
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16, paddingTop: 8 }}
                ListEmptyComponent={() => (
                    <UiText>
                        {term.trim().length > 1
                            ? 'No results found in stubbed sources.'
                            : 'Enter at least 2 characters to search.'}
                    </UiText>
                )}
                renderItem={({ item }) => (
                    <ResultRow
                        result={item}
                        onChoose={async () => {
                            try {
                                setLoading(true)
                                const r = await importFromUrl(item.source.url)
                                if (r.error || !r.draft) {
                                    Alert.alert(
                                        'Import failed',
                                        r.error ||
                                            'Unable to extract content from this page.'
                                    )
                                } else {
                                    await setImportDraft(r.draft)
                                    router.push('/(tabs)/add?draft=1' as any)
                                }
                            } catch (e) {
                                console.warn(e)
                                Alert.alert(
                                    'Import error',
                                    'Something went wrong while importing.'
                                )
                            } finally {
                                setLoading(false)
                            }
                        }}
                    />
                )}
            />
        </SafeAreaView>
    )
}

function ResultRow({
    result,
    onChoose,
}: {
    result: SearchResult
    onChoose: () => void
}) {
    return (
        <Pressable
            onPress={onChoose}
            style={{
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb',
            }}
            accessibilityRole="button"
        >
            <UiText>{result.title}</UiText>
            <UiText variant="caption">{result.source.site}</UiText>
            {/* <UiText variant="caption">{result.source.url}</UiText> */}
        </Pressable>
    )
}
