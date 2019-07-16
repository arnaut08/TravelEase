-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 16, 2019 at 03:55 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TravelEase`
--

-- --------------------------------------------------------

--
-- Table structure for table `Auth`
--

CREATE TABLE `Auth` (
  `authId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Auth`
--

INSERT INTO `Auth` (`authId`, `email`, `password`, `token`) VALUES
(1, 'try@try.com', '$2b$10$QxVbT1w2LbhAXxWOAWPozewg2kOAS0j2/DVlTNcfA7DnUqaK5SRSi', 'anotherrandom'),
(2, 'archit@random.com', '$2b$10$4WB3e/k.jyuWkZlsKhzRnuP38C.TjEZu5xWnpdp1xxm/OX18JGTz6', 'anotherrandom'),
(3, 'qwe@qwe', '$2b$10$rxOpDHUJD64SCERi9FU5t.C9OguTCt.D8YSO0V2rN2FkBuzSTWVNq', 'anotherrandom'),
(4, 'user@abc.com', '$2b$10$o3YH1sUXiEz9ZUoGYde9Euj6ScWtKJ3eZRU4LDTZllnPlkcGG3n.6', 'anotherrandom'),
(10, 'wrejh@ewkrj', '$2b$10$me/4VaHBbeiPfX2YPf6T2ufkaY0JhVQ.uqRDsyoQhLESLY0C9yt0.', 'anotherrandom'),
(11, 'jimitraval@yahoo.com', '$2b$10$AC7R/QUE3g7k40.3gnlUN.IJd0GmhIxS2/5zZFFzco0wiJGPz2lX6', 'anotherrandom');

-- --------------------------------------------------------

--
-- Table structure for table `Buses`
--

CREATE TABLE `Buses` (
  `busId` int(11) NOT NULL,
  `busTitle` varchar(255) NOT NULL,
  `busDescription` varchar(255) NOT NULL,
  `busCategory` varchar(255) NOT NULL,
  `terms` varchar(10000) NOT NULL,
  `company` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Buses`
--

INSERT INTO `Buses` (`busId`, `busTitle`, `busDescription`, `busCategory`, `terms`, `company`) VALUES
(3, 'RandomBus', 'randomdescription', 'AC-Sleeper', 'qwjgheheqwehqwe', 6),
(4, 'qweasd', 'asdasd', 'AC-Sleeper', 'xcvxzcv', 6);

-- --------------------------------------------------------

--
-- Table structure for table `Merchants`
--

CREATE TABLE `Merchants` (
  `merchantId` int(11) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Merchants`
--

INSERT INTO `Merchants` (`merchantId`, `companyName`, `owner`) VALUES
(6, 'JD Bank', 11);

-- --------------------------------------------------------

--
-- Table structure for table `Timetable`
--

CREATE TABLE `Timetable` (
  `tId` int(11) NOT NULL,
  `source` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `route` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `capacity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `bus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `DOB` date DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `user_auth` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userId`, `firstName`, `lastName`, `phone`, `DOB`, `role`, `user_auth`) VALUES
(1, 'anothertry', 'askdjh', 129487, '2019-07-01', 'admin', 1),
(2, 'archit', 'n', 123, '2019-07-01', 'admin', 2),
(3, 'random', 'random', 123, '2019-07-01', 'admin', 3),
(4, 'random', 'userone', 92346, '2019-07-01', 'user', 4),
(10, 'ertiuy', 'iewuy', 243958, '2019-07-03', 'user', 10),
(11, 'Jimit', 'raval', 123, '2019-07-01', 'merchant', 11);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Auth`
--
ALTER TABLE `Auth`
  ADD PRIMARY KEY (`authId`);

--
-- Indexes for table `Buses`
--
ALTER TABLE `Buses`
  ADD PRIMARY KEY (`busId`),
  ADD KEY `company` (`company`);

--
-- Indexes for table `Merchants`
--
ALTER TABLE `Merchants`
  ADD PRIMARY KEY (`merchantId`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `Timetable`
--
ALTER TABLE `Timetable`
  ADD PRIMARY KEY (`tId`),
  ADD KEY `bus` (`bus`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `user_auth` (`user_auth`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Auth`
--
ALTER TABLE `Auth`
  MODIFY `authId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Buses`
--
ALTER TABLE `Buses`
  MODIFY `busId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Merchants`
--
ALTER TABLE `Merchants`
  MODIFY `merchantId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Timetable`
--
ALTER TABLE `Timetable`
  MODIFY `tId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Buses`
--
ALTER TABLE `Buses`
  ADD CONSTRAINT `Buses_ibfk_1` FOREIGN KEY (`company`) REFERENCES `Merchants` (`merchantId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Merchants`
--
ALTER TABLE `Merchants`
  ADD CONSTRAINT `Merchants_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Timetable`
--
ALTER TABLE `Timetable`
  ADD CONSTRAINT `Timetable_ibfk_1` FOREIGN KEY (`bus`) REFERENCES `Buses` (`busId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`user_auth`) REFERENCES `Auth` (`authId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
