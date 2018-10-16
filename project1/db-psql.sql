CREATE SCHEMA IF NOT EXISTS crm;
SET search_path TO crm;

-- -----------------------------------------------------
-- Table SystemUser
-- -----------------------------------------------------

-- this will be handled by the application but we want to set the session user here for all of our testing
set session "act_log.user" = 1;

select 'Dropping tables & types';
DROP TABLE IF EXISTS Appointment ;
DROP TABLE IF EXISTS Client ;
DROP TABLE IF EXISTS Therapist ;
DROP TABLE IF EXISTS ActivityLog ;
DROP TABLE IF EXISTS SystemUser ;

DROP TYPE IF EXISTS status_active;
CREATE TYPE status_active AS ENUM ('Y', 'N');

select 'creating SystemUser table';
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
select 'populating first SystemUser';
INSERT INTO SystemUser
	(id, identity_id,email,active,created_by,creation_date,last_updated_by,last_updated_date) 
	VALUES (1, '', 'stephen@nielson.org', 'Y', 1, NOW(), 1, NOW());
ALTER SEQUENCE systemuser_id_seq RESTART WITH 2;


-- -----------------------------------------------------
-- Table ActivityLog
-- -----------------------------------------------------

DROP TYPE IF EXISTS log_action_type;
CREATE TYPE log_action_type AS ENUM('INSERT', 'SELECT', 'UPDATE', 'DELETE') ;

select 'Creating ActivityLog';
CREATE TABLE IF NOT EXISTS ActivityLog (
  id serial primary key,
  table_name VARCHAR(100) NOT NULL,
  table_id serial NOT NULL,
  action log_action_type NOT NULL,
  notes TEXT NOT NULL,
    created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL
);

select 'Creating ActivityLog Insert trigger';
CREATE  OR REPLACE FUNCTION activity_log_su_insert() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('SystemUser', NEW.id, 'INSERT', CONCAT(NEW.email, ' was created.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.created_by := current_setting('act_log.user')::integer;
	NEW.creation_date := NOW();
	NEW.last_updated_by := current_setting('act_log.user')::integer;
	NEW.last_updated_date := NOW();

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
select 'Creating ActivityLog Update trigger';
CREATE  OR REPLACE FUNCTION activity_log_su_update() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('SystemUser', NEW.id, 'UPDATE', CONCAT(NEW.email, ' was updated.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.last_updated_by := current_setting('act_log.user')::integer;
	NEW.last_updated_date := NOW();

	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_su_update ON SystemUser;

CREATE TRIGGER trg_log_su_update
    BEFORE UPDATE ON SystemUser
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_su_update();

-- delete functions / triggers
select 'Creating ActivityLog Delete trigger';
CREATE  OR REPLACE FUNCTION activity_log_su_delete() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('SystemUser', OLD.id, 'DELETE', CONCAT(OLD.email, ' was deleted.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	RETURN OLD;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_su_delete ON SystemUser;

CREATE TRIGGER trg_log_su_delete
    BEFORE DELETE ON SystemUser
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_su_delete();

select 'Running SystemUser ActivityLog tests';

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

-- now do a delete
DELETE FROM SystemUser WHERE email = 'stephen+test2@nielson.org';

-- Run some tests
select * from ActivityLog;

-- make sure the SystemUser's are setup correctly.
select * from SystemUser;


-- -----------------------------------------------------
-- Table Therapist
-- -----------------------------------------------------

select 'Creating Therapist table';
CREATE TABLE IF NOT EXISTS Therapist (
  id serial primary key,
  active status_active NOT NULL DEFAULT 'Y',
  name VARCHAR(255) NOT NULL,
  created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL,
  last_updated_by serial NOT NULL references SystemUser(id),
  last_updated_date timestamp NOT NULL
);

select 'Creating Therapist Insert trigger';
CREATE  OR REPLACE FUNCTION activity_log_therapist_insert() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('Therapist', NEW.id, 'INSERT', CONCAT(NEW.name, ' was created.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.created_by := current_setting('act_log.user')::integer;
	NEW.creation_date := NOW();
	NEW.last_updated_by := current_setting('act_log.user')::integer;
	NEW.last_updated_date := NOW();

	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_therapist_insert ON Therapist;

CREATE TRIGGER trg_log_therapist_insert
    BEFORE INSERT ON Therapist
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_therapist_insert();

-- update functions / triggers
select 'Creating Therapist Update trigger';
CREATE  OR REPLACE FUNCTION activity_log_therapist_update() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('Therapist', NEW.id, 'UPDATE', CONCAT(NEW.name, ' was updated.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.last_updated_by := current_setting('act_log.user')::integer;
	NEW.last_updated_date := NOW();

	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_therapist_update ON Therapist;

CREATE TRIGGER trg_log_therapist_update
    BEFORE UPDATE ON Therapist
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_therapist_update();

-- delete functions / triggers
select 'Creating Therapist Delete trigger';
CREATE  OR REPLACE FUNCTION activity_log_therapist_delete() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('Therapist', OLD.id, 'DELETE', CONCAT(OLD.name, ' was deleted.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	RETURN OLD;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_therapist_delete ON Therapist;

CREATE TRIGGER trg_log_therapist_delete
    BEFORE DELETE ON Therapist 
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_therapist_delete();

select 'Running Therapist ActivityLog tests';

-- Insert some Therapists
/* 
  id serial primary key,
  active status_active NOT NULL DEFAULT 'Y',
  name VARCHAR(255) NOT NULL,
  created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL,
  last_updated_by serial NOT NULL references SystemUser(id),
  last_updated_date timestamp NOT NULL
*/
set session "act_log.user" = 2;
INSERT INTO Therapist(name,created_by,creation_date,last_updated_by,last_updated_date) VALUES('John',1,NOW(),1,NOW()); 
INSERT INTO Therapist(name,created_by,creation_date,last_updated_by,last_updated_date) VALUES ('Stephen',1,NOW(),1,NOW());
INSERT INTO Therapist(name,created_by,creation_date,last_updated_by,last_updated_date) VALUES ('Sam',1,NOW(),1,NOW());

-- Now do some updates here
set session "act_log.user" = 1;
Update Therapist SET name = 'Billy Lee' WHERE name = 'John';

-- now do a delete
DELETE FROM Therapist WHERE name = 'Stephen';

-- Run some tests
select * from ActivityLog;

-- make sure the SystemUser's are setup correctly.
select * from Therapist;

-- -----------------------------------------------------
-- Table Client
-- -----------------------------------------------------

select 'Creating Client table';
CREATE TABLE IF NOT EXISTS Client (
  id serial primary key,
  active status_active NOT NULL DEFAULT 'Y',
  name VARCHAR(255) NOT NULL,
  created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL,
  last_updated_by serial NOT NULL references SystemUser(id),
  last_updated_date timestamp NOT NULL
);

select 'Creating Client Insert trigger';
CREATE  OR REPLACE FUNCTION activity_log_client_insert() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('Client', NEW.id, 'INSERT', CONCAT(NEW.name, ' was created.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.created_by := current_setting('act_log.user')::integer;
	NEW.creation_date := NOW();
	NEW.last_updated_by := current_setting('act_log.user')::integer;
	NEW.last_updated_date := NOW();

	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_client_insert ON Client;

CREATE TRIGGER trg_log_client_insert
    BEFORE INSERT ON Client 
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_client_insert();

-- update functions / triggers
select 'Creating Client Update trigger';
CREATE  OR REPLACE FUNCTION activity_log_client_update() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('Client', NEW.id, 'UPDATE', CONCAT(NEW.name, ' was updated.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.last_updated_by := current_setting('act_log.user')::integer;
	NEW.last_updated_date := NOW();

	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_client_update ON Client;

CREATE TRIGGER trg_log_client_update
    BEFORE UPDATE ON Client 
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_client_update();

-- delete functions / triggers
select 'Creating Client Delete trigger';
CREATE  OR REPLACE FUNCTION activity_log_client_delete() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('Client', OLD.id, 'DELETE', CONCAT(OLD.name, ' was deleted.'), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	RETURN OLD;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_client_delete ON Therapist;

CREATE TRIGGER trg_log_client_delete
    BEFORE DELETE ON Client
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_client_delete();

select 'Running Client ActivityLog tests';

-- Insert some Clients
/* 
  id serial primary key,
  active status_active NOT NULL DEFAULT 'Y',
  name VARCHAR(255) NOT NULL,
  created_by serial NOT NULL references SystemUser(id),
  creation_date timestamp NOT NULL,
  last_updated_by serial NOT NULL references SystemUser(id),
  last_updated_date timestamp NOT NULL
*/
set session "act_log.user" = 2;
INSERT INTO Client(name,created_by,creation_date,last_updated_by,last_updated_date) VALUES('Jason',1,NOW(),1,NOW()); 
INSERT INTO Client(name,created_by,creation_date,last_updated_by,last_updated_date) VALUES ('Jacob',1,NOW(),1,NOW());
INSERT INTO Client(name,created_by,creation_date,last_updated_by,last_updated_date) VALUES ('Jeremiah',1,NOW(),1,NOW());

-- Now do some updates here
set session "act_log.user" = 1;
Update Client SET name = 'Bobby Joe' WHERE name = 'Jason';

-- now do a delete
DELETE FROM Client WHERE name = 'Jacob';

-- Run some tests
select * from ActivityLog;

-- make sure the SystemUser's are setup correctly.
select * from Client;

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

select 'Creating Appointment Insert trigger';
CREATE  OR REPLACE FUNCTION activity_log_appointment_insert() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('Appointment', NEW.id, 'INSERT', CONCAT('Appointment for Therapist ', (select name FROM Therapist WHERE NEW.therapist_id = id)
		, ' AND Client ', (select name FROM Therapist WHERE NEW.client_id = id), ' from ', NEW.start_date, ' to ', NEW.end_date), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.created_by := current_setting('act_log.user')::integer;
	NEW.creation_date := NOW();
	NEW.last_updated_by := current_setting('act_log.user')::integer;
	NEW.last_updated_date := NOW();

	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_appointment_insert ON Client;

CREATE TRIGGER trg_log_client_insert
    BEFORE INSERT ON Appointment
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_appointment_insert();

-- update functions / triggers
select 'Creating Appointment Update trigger';
CREATE  OR REPLACE FUNCTION activity_log_appointment_update() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('Appointment', NEW.id, 'UPDATE', CONCAT('Appointment updated for Therapist ', (select name FROM Therapist WHERE NEW.therapist_id = id)
		, ' AND Client ', (select name FROM Therapist WHERE NEW.client_id = id), ' from ', NEW.start_date, ' to ', NEW.end_date), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	NEW.last_updated_by := current_setting('act_log.user')::integer;
	NEW.last_updated_date := NOW();

	RETURN NEW;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_appointment_update ON Client;

CREATE TRIGGER trg_log_appointment_update
    BEFORE UPDATE ON Appointment
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_appointment_update();

-- delete functions / triggers
select 'Creating Appointment Delete trigger';
CREATE  OR REPLACE FUNCTION activity_log_appointment_delete() RETURNS trigger AS $BODY$
BEGIN
	INSERT INTO ActivityLog(table_name, table_id, action, notes, created_by, creation_date)
	VALUES('Appointment', OLD.id, 'DELETE', CONCAT('Appointment deleted for Therapist ', (select name FROM Therapist WHERE OLD.therapist_id = id)
		, ' AND Client ', (select name FROM Therapist WHERE OLD.client_id = id), ' from ', OLD.start_date, ' to ', OLD.end_date), current_setting('act_log.user')::integer, NOW());

-- make sure the user's are the actual users here
	RETURN OLD;
END
$BODY$

LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_appointment_delete ON Appointment;

CREATE TRIGGER trg_log_appointment_delete
    BEFORE DELETE ON Appointment
    FOR EACH ROW
    EXECUTE PROCEDURE activity_log_appointment_delete();


-- Insert some Appointments
set session "act_log.user" = 2;
INSERT INTO Appointment(client_id,therapist_id,start_date, end_date, creation_date,created_by,last_updated_by,last_updated_date) 
	VALUES(
		(SELECT id FROM Client WHERE name = 'Bobby Joe')
		,(SELECT id FROM Therapist WHERE name = 'Billy Lee')
		,NOW()
		,NOW() + interval '1 hour'
		,NOW()
		,1
		,1
		,NOW()
	);
INSERT INTO Appointment(client_id,therapist_id,start_date, end_date, creation_date,created_by,last_updated_by,last_updated_date) 
	VALUES(
		(SELECT id FROM Client WHERE name = 'Jeremiah')
		,(SELECT id FROM Therapist WHERE name = 'Sam')
		,NOW() + interval '2 hours'
		,NOW() + interval '3 hours'
		,NOW()
		,1
		,1
		,NOW()
	);

-- Now do some updates here
set session "act_log.user" = 1;
Update Appointment SET end_date = NOW() + interval '4 hours' 
WHERE 
	client_id = (SELECT id FROM Client WHERE name='Bobby Joe') AND therapist_id = (SELECT id FROM Therapist WHERE name = 'Billy Lee');

-- now do a delete
DELETE FROM 
	Appointment 
WHERE
	client_id = (SELECT id FROM Client WHERE name='Bobby Joe') AND therapist_id = (SELECT id FROM Therapist WHERE name = 'Billy Lee');

-- Run some tests
select * from ActivityLog;

-- make sure the SystemUser's are setup correctly.
select * from Appointment;
