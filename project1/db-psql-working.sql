CREATE SCHEMA IF NOT EXISTS crm;
SET search_path TO crm;

-- -----------------------------------------------------
-- Table SystemUser
-- -----------------------------------------------------
DROP TABLE IF EXISTS Appointment ;
DROP TABLE IF EXISTS Client ;
DROP TABLE IF EXISTS Therapist ;
DROP TABLE IF EXISTS ActivityLog ;
DROP TABLE IF EXISTS SystemUser ;

DROP TYPE IF EXISTS status_active;
CREATE TYPE status_active AS ENUM ('Y', 'N');

CREATE TABLE IF NOT EXISTS SystemUser (
  id serial primary key,
  identity_id VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  active status_active NOT NULL DEFAULT 'Y',
  created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL,
  last_updated_by serial NOT NULL references SystemUser(id),
  last_updated_date timestamp NOT NULL
);

-- Insert SystemUser so we can use the user for everything else
INSERT INTO SystemUser
	(id, identity_id,email,active,created_by,creation_date,last_updated_by,last_updated_date) 
	VALUES (1, '', 'stephen@nielson.org', 'Y', 1, NOW(), 1, NOW());
ALTER SEQUENCE systemuser_id_seq RESTART WITH 2;


-- -----------------------------------------------------
-- Table ActivityLog
-- -----------------------------------------------------

DROP TYPE IF EXISTS log_action_type;
CREATE TYPE log_action_type AS ENUM('INSERT', 'SELECT', 'UPDATE', 'DELETE') ;

CREATE TABLE IF NOT EXISTS ActivityLog (
  id serial primary key,
  table_name VARCHAR(100) NOT NULL,
  table_id serial NOT NULL,
  action log_action_type NOT NULL,
  notes TEXT NOT NULL,
    created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL
);

CREATE  OR REPLACE FUNCTION activity_log_su_insert() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('SystemUser', NEW.id, 'INSERT', CONCAT(NEW.email, ' was created.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.created_by = current_setting('act_log.user')::integer;
	NEW.creation_date = NOW()
	NEW.last_updated_by = current_setting('act_log.user')::integer;
	NEW.last_update_date = NOW()

	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_su_insert ON SystemUser;

CREATE TRIGGER trg_log_su_insert
    BEFORE INSERT ON SystemUser
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_su_insert();

-- update functions / triggers
CREATE  OR REPLACE FUNCTION activity_log_su_update() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('SystemUser', NEW.id, 'UPDATE', CONCAT(NEW.email, ' was updated.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.last_updated_by := current_setting('act_log.user')::integer;
	NEW.last_update_date := NOW()

	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_su_update ON SystemUser;

CREATE TRIGGER trg_log_su_update
    BEFORE UPDATE ON SystemUser
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_su_update();


-- -----------------------------------------------------
-- Table Therapist
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Therapist (
  id serial primary key,
  active status_active NOT NULL DEFAULT 'Y',
  name VARCHAR(255) NOT NULL,
  created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL,
  last_updated_by serial NOT NULL references SystemUser(id),
  last_updated_date timestamp NOT NULL
);


-- -----------------------------------------------------
-- Table Client
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Client (
  id serial primary key,
  active status_active NOT NULL DEFAULT 'Y',
  name VARCHAR(255) NOT NULL,
  created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL,
  last_updated_by serial NOT NULL references SystemUser(id),
  last_updated_date timestamp NOT NULL
);


-- -----------------------------------------------------
-- Table Appointment
-- -----------------------------------------------------

DROP TYPE IF EXISTS status_appointment;
CREATE TYPE status_appointment AS ENUM('pending', 'canceled', 'noshow', 'completed');

CREATE TABLE IF NOT EXISTS Appointment (
  id serial primary key,
  client_id serial NOT NULL references Client(id),
  therapist_id serial NOT NULL references Therapist(id),
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,
  active status_active NOT NULL DEFAULT 'Y',
  status  status_appointment NOT NULL DEFAULT 'pending',
  created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL,
  last_updated_by serial NOT NULL references SystemUser(id),
  last_updated_date timestamp NOT NULL
);

-- this will be handled by the application but we want to set who the user is here
set session "act_log.user" = 1;

-- Insert some SystemUsers
INSERT INTO SystemUser(identity_id,email,active,created_by,creation_date,last_updated_by,last_updated_date) 
	VALUES ('something', 'stephen+test1@nielson.org', 'Y', 1, NOW(), 1, NOW());

set session "act_log.user" = 2;

INSERT INTO SystemUser(identity_id,email,active,created_by,creation_date,last_updated_by,last_updated_date) 
	VALUES ('something-2', 'stephen+test2@nielson.org', 'Y', 1, NOW(), 1, NOW() );
-- Run some tests
select * from ActivityLog;

-- make sure the SystemUser's are setup correctly.
select * from SystemUser;

-- Now do some updates here
set session "act_log.user" = 1;
Update SystemUser SET identity_id = 'something-2-update' WHERE email = 'stephen+test2@nielson.org';

-- Run some tests
select * from ActivityLog;

-- make sure the SystemUser's are setup correctly.
select * from SystemUser;
\d SystemUser;
