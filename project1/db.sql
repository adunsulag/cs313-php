-- MySQL Script generated by MySQL Workbench
-- Mon 08 Oct 2018 07:13:45 AM EDT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `SystemUser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SystemUser` ;

CREATE TABLE IF NOT EXISTS `SystemUser` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `identity_id` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `active` ENUM('Y', 'N') NOT NULL DEFAULT 'Y',
  `created_by` INT NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `last_updated_by` INT NOT NULL,
  `last_updated_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_systemuser_created_by`
    FOREIGN KEY ()
    REFERENCES `SystemUser` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_systemuser_last_updated_by`
    FOREIGN KEY ()
    REFERENCES `SystemUser` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Therapist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Therapist` ;

CREATE TABLE IF NOT EXISTS `Therapist` (
  `id` INT UNSIGNED NOT NULL,
  `active` ENUM('Y', 'N') NOT NULL DEFAULT 'Y',
  `name` VARCHAR(255) NOT NULL,
  `created_by` INT UNSIGNED NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `last_updated_by` INT UNSIGNED NOT NULL,
  `active` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `index2` (),
  CONSTRAINT `fk_therapist_created_by`
    FOREIGN KEY ()
    REFERENCES `SystemUser` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_therapist_last_updated_by`
    FOREIGN KEY ()
    REFERENCES `SystemUser` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Client`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Client` ;

CREATE TABLE IF NOT EXISTS `Client` (
  `id` INT UNSIGNED NOT NULL,
  `active` ENUM('Y', 'N') NOT NULL DEFAULT 'Y',
  `name` VARCHAR(255) NOT NULL,
  `created_by` INT UNSIGNED NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `last_updated_by` INT UNSIGNED NOT NULL,
  `active` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `index2` (),
  CONSTRAINT `fk_therapist_created_by0`
    FOREIGN KEY ()
    REFERENCES `SystemUser` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_therapist_last_updated_by0`
    FOREIGN KEY ()
    REFERENCES `SystemUser` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Appointment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Appointment` ;

CREATE TABLE IF NOT EXISTS `Appointment` (
  `id` INT NOT NULL,
  `client_id` INT UNSIGNED NOT NULL,
  `therapist_id` INT UNSIGNED NOT NULL,
  `start` DATETIME NOT NULL,
  `end` DATETIME NOT NULL,
  `active` ENUM('Y', 'N') NOT NULL DEFAULT 'Y',
  `status` ENUM('pending', 'canceled', 'noshow', 'completed') NOT NULL DEFAULT 'pending',
  `created_by` INT UNSIGNED NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `last_updated_by` INT UNSIGNED NOT NULL,
  `last_updated_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_appointment_client_id_idx` (`client_id` ASC),
  INDEX `fk_appointment_therapist_id_idx` (`therapist_id` ASC),
  INDEX `fk_appointment_created_by_id_idx` (`created_by` ASC),
  INDEX `fk_appointment_last_updated_by_id_idx` (`last_updated_by` ASC),
  CONSTRAINT `fk_appointment_client_id`
    FOREIGN KEY (`client_id`)
    REFERENCES `Client` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_appointment_therapist_id`
    FOREIGN KEY (`therapist_id`)
    REFERENCES `Therapist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_appointment_created_by_id`
    FOREIGN KEY (`created_by`)
    REFERENCES `SystemUser` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_appointment_last_updated_by_id`
    FOREIGN KEY (`last_updated_by`)
    REFERENCES `SystemUser` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ActivityLog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ActivityLog` ;

CREATE TABLE IF NOT EXISTS `ActivityLog` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `table` VARCHAR(100) NOT NULL,
  `table_id` INT NOT NULL,
  `action` ENUM('INSERT', 'SELECT', 'UPDATE', 'DELETE') NOT NULL,
  `notes` TEXT NOT NULL,
  `created_by` INT UNSIGNED NOT NULL,
  `creation_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_activitylog_created_by_id_idx` (`created_by` ASC),
  CONSTRAINT `fk_activitylog_created_by_id`
    FOREIGN KEY (`created_by`)
    REFERENCES `SystemUser` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;