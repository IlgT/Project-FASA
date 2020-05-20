DROP TABLE IF EXISTS EXPENSE_TRACKER.TAG;
DROP TABLE IF EXISTS EXPENSE_TRACKER.EXPENSE;
DROP TABLE IF EXISTS EXPENSE_TRACKER.EXCHANGE;
DROP TABLE IF EXISTS EXPENSE_TRACKER.EXPENSE_TAGS;
DROP SCHEMA IF EXISTS EXPENSE_TRACKER;

CREATE SCHEMA EXPENSE_TRACKER;

CREATE TABLE EXPENSE_TRACKER.TAG(
  TAG_ID               	    		integer GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  TAG_VERSION			  			integer NOT NULL, 
  TAG_NAME							varchar(50) NOT NULL,
  TAG_CREATED_TIMESTAMP 			TIMESTAMP NOT NULL,
  TAG_UPDATED_TIMESTAMP 			TIMESTAMP
);

CREATE TABLE EXPENSE_TRACKER.EXCHANGE(
  EXCHANGE_ID						integer GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  EXCHANGE_VERSION					integer NOT NULL, 
  EXCHANGE_BASE_CURRENCY			varchar(3) NOT NULL,
  EXCHANGE_TARGET_CURRENCY 			varchar(3) NOT NULL,
  EXCHANGE_RATE 					FLOAT NOT NULL,
  EXCHANGE_DATE						date,
  EXCHANGE_CREATED_TIMESTAMP		TIMESTAMP NOT NULL,
  EXCHANGE_UPDATED_TIMESTAMP		TIMESTAMP
);

CREATE TABLE EXPENSE_TRACKER.EXPENSE(
  EXPENSE_ID						integer GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  EXPENSE_VERSION					integer NOT NULL, 
  EXPENSE_VALUE 					DECIMAL(9,2),
  EXPENSE_CURRENCY 					varchar(3),
  EXPENSE_REASON				 	varchar(100) NOT NULL,
  EXPENSE_DATE						date NOT NULL, 
  EXPENSE_ORIGINAL_VALUE 			DECIMAL(9,2),
  EXPENSE_ORIGINAL_CURRENCY 		varchar(3),
  EXPENSE_EXCHANGE_RATE 			DECIMAL(3,2),
  EXPENSE_CREATED_TIMESTAMP			TIMESTAMP NOT NULL,
  EXPENSE_UPDATED_TIMESTAMP			TIMESTAMP
);

CREATE TABLE EXPENSE_TRACKER.EXPENSE_TAGS (
	EXPENSE_ID int NOT NULL REFERENCES EXPENSE_TRACKER.EXPENSE(EXPENSE_ID) ON DELETE RESTRICT,
	TAG_ID int NOT NULL REFERENCES EXPENSE_TRACKER.TAG(TAG_ID) ON DELETE RESTRICT
);