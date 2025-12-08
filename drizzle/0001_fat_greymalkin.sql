CREATE TABLE `user_songs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`artist` text NOT NULL,
	`key` text,
	`capo` integer,
	`bpm` integer,
	`tags` text NOT NULL,
	`lines` text NOT NULL
);
