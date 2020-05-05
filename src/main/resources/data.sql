CREATE SCHEMA EXPENSE_TRACKER;

CREATE TABLE  EXPENSE_TRACKER.TAG (
	TAG_ID int,
	TAG_VERSION int,
	TAG_NAME varchar(255),
	TAG_CREATED_TIMESTAMP date,
	TAG_UPDATED_TIMESTAMP date
);

ALTER TABLE EXPENSE_TRACKER.TAG MODIFY COLUMN TAG_ID INT auto_increment;