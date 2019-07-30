-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 30, 2019 at 03:59 PM
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
-- Database: `TravelEaseDb`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `authId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`authId`, `email`, `password`) VALUES
(2, 'archit@random.com', '$2b$10$4WB3e/k.jyuWkZlsKhzRnuP38C.TjEZu5xWnpdp1xxm/OX18JGTz6'),
(4, 'user@abc.com', '$2b$10$o3YH1sUXiEz9ZUoGYde9Euj6ScWtKJ3eZRU4LDTZllnPlkcGG3n.6'),
(10, 'wrejh@ewkrj', '$2b$10$me/4VaHBbeiPfX2YPf6T2ufkaY0JhVQ.uqRDsyoQhLESLY0C9yt0.'),
(11, 'jimitraval@yahoo.com', '$2b$10$d5k72v.l/wKRw9EdahzVLOLQm0TItOL2yKKvJtsEcngQ9iI1EahCC'),
(17, 'jm@example.com', '$2b$10$lsSFF4fR2WoMgkjK4zGakOptP0FtyNoGxBAJJ5fkDqEhbvmPkw/qm'),
(23, 'asdkja@asdlkj', '$2b$10$2PO2JPjU2jZxRvRzL03LWO/OEbgjSZnFnOOzw4GgchK4YX3u1/Nua');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `bookingId` int(11) NOT NULL,
  `bookedBy` int(11) NOT NULL,
  `bookedBus` int(11) NOT NULL,
  `payment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`bookingId`, `bookedBy`, `bookedBus`, `payment`) VALUES
(22, 4, 2, 19),
(23, 4, 5, 20),
(24, 4, 5, 21);

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `busId` int(11) NOT NULL,
  `busTitle` varchar(255) NOT NULL,
  `busDescription` varchar(255) NOT NULL,
  `busCategory` varchar(255) NOT NULL,
  `terms` varchar(10000) NOT NULL,
  `company` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buses`
--

INSERT INTO `buses` (`busId`, `busTitle`, `busDescription`, `busCategory`, `terms`, `company`) VALUES
(3, 'RandomBus', 'randomdescription', 'AC-Sleeper', 'qwjgheheqwehqwe', 6),
(4, 'qweasd', 'asdasd', 'AC-Sleeper', 'xcvxzcv', 6),
(5, 'random', 'randomdescription', 'NonAC-Sleeper', 'random terms', 6),
(6, 'qwerty', 'bus', 'NonAC-Sleeper', 'asdasdas', 6);

-- --------------------------------------------------------

--
-- Table structure for table `merchants`
--

CREATE TABLE `merchants` (
  `merchantId` int(11) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `merchants`
--

INSERT INTO `merchants` (`merchantId`, `companyName`, `owner`) VALUES
(6, 'JD Bank', 11);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payId` int(11) NOT NULL,
  `transactionId` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `receipt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payId`, `transactionId`, `amount`, `receipt`) VALUES
(19, 'txn_1F05XPI1f9Sk0G9I95KItKuO', 134, 'https://pay.stripe.com/receipts/acct_1ExYJEI1f9Sk0G9I/ch_1F05XPI1f9Sk0G9Imf57huY0/rcpt_FV5i1G6NRkgtRmFmR7ko2QN2HyaZ2Ui'),
(20, 'txn_1F05YzI1f9Sk0G9ICZRadqid', 2397, 'https://pay.stripe.com/receipts/acct_1ExYJEI1f9Sk0G9I/ch_1F05YyI1f9Sk0G9Ipj2pC7JY/rcpt_FV5kzxHdJePnBK5XnjL40b9ibnciI3T'),
(21, 'txn_1F06WcI1f9Sk0G9IdGopQjkE', 2397, 'https://pay.stripe.com/receipts/acct_1ExYJEI1f9Sk0G9I/ch_1F06WcI1f9Sk0G9IRhKOOfOO/rcpt_FV6kUwwSnAtGNVDH1DfBXjJI6dhgjIu');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `ratingId` int(11) NOT NULL,
  `journey` int(11) NOT NULL,
  `rating` int(11) DEFAULT 0,
  `review` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`ratingId`, `journey`, `rating`, `review`) VALUES
(1, 22, 5, 'good'),
(2, 23, 3, 'decent'),
(3, 24, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `tId` int(11) NOT NULL,
  `source` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `route` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `capacity` int(11) NOT NULL,
  `available` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `bus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`tId`, `source`, `destination`, `route`, `date`, `time`, `capacity`, `available`, `price`, `bus`) VALUES
(2, 'qwe', 'qwe', 'asd-asd-asd-qwe', '2019-07-01', '11:11:00', 12, 11, 134, 3),
(3, 'random', 'kasjfh', 'oiurew', '2019-07-03', '12:12:00', 12, 12, 345, 4),
(5, 'Ahmedabad', 'Jaipur', 'Ahmedabad-Vadodara-Jaipur', '2019-07-27', '12:00:00', 50, 42, 799, 3),
(6, 'surat', 'vadodara', 'a-b-c', '2019-07-27', '15:02:00', 20, 20, 100, 3);

-- --------------------------------------------------------

--
-- Table structure for table `travellers`
--

CREATE TABLE `travellers` (
  `travellerId` int(11) NOT NULL,
  `travellerName` varchar(255) NOT NULL,
  `booking` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `travellers`
--

INSERT INTO `travellers` (`travellerId`, `travellerName`, `booking`) VALUES
(1, 'qweasd', 22),
(2, 'first', 23),
(3, 'second', 23),
(4, 'third', 23),
(5, 'qwe', 24),
(6, 'asd', 24),
(7, 'zxc', 24);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `DOB` date DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `user_auth` int(11) NOT NULL,
  `profilePic` varchar(255) NOT NULL DEFAULT 'uploads/defaultuser.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `phone`, `DOB`, `role`, `user_auth`, `profilePic`) VALUES
(2, 'archit', 'n', 123, '2019-07-01', 'admin', 2, 'uploads/defaultuser.png'),
(4, 'random', 'userone', 92346, '2019-07-01', 'user', 4, 'uploads/defaultuser.png'),
(10, 'ertiuy', 'iewuy', 243958, '2019-07-03', 'user', 10, 'random'),
(11, 'Jimit', 'Raval', 123, '2019-06-30', 'merchant', 11, 'uploads/jimitraval@yahoo.com-Association.png'),
(17, 'jm', 'aad', 132456798, '1987-03-25', 'user', 17, 'uploads/defaultuser.png'),
(22, 'random', 'girl', 132132456, '2019-07-02', 'user', 23, 'uploads/defaultuser.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`authId`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`bookingId`),
  ADD KEY `bookedBy` (`bookedBy`),
  ADD KEY `payment` (`payment`),
  ADD KEY `bookedBus` (`bookedBus`);

--
-- Indexes for table `buses`
--
ALTER TABLE `buses`
  ADD PRIMARY KEY (`busId`),
  ADD KEY `company` (`company`);

--
-- Indexes for table `merchants`
--
ALTER TABLE `merchants`
  ADD PRIMARY KEY (`merchantId`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payId`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`ratingId`);

--
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`tId`),
  ADD KEY `bus` (`bus`);

--
-- Indexes for table `travellers`
--
ALTER TABLE `travellers`
  ADD PRIMARY KEY (`travellerId`),
  ADD KEY `booking` (`booking`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `user_auth` (`user_auth`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `authId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `bookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `buses`
--
ALTER TABLE `buses`
  MODIFY `busId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `merchants`
--
ALTER TABLE `merchants`
  MODIFY `merchantId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `ratingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `timetable`
--
ALTER TABLE `timetable`
  MODIFY `tId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `travellers`
--
ALTER TABLE `travellers`
  MODIFY `travellerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`bookedBy`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`bookedBus`) REFERENCES `timetable` (`tId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`payment`) REFERENCES `payment` (`payId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `buses`
--
ALTER TABLE `buses`
  ADD CONSTRAINT `buses_ibfk_1` FOREIGN KEY (`company`) REFERENCES `merchants` (`merchantId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `merchants`
--
ALTER TABLE `merchants`
  ADD CONSTRAINT `merchants_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `timetable`
--
ALTER TABLE `timetable`
  ADD CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`bus`) REFERENCES `buses` (`busId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `travellers`
--
ALTER TABLE `travellers`
  ADD CONSTRAINT `travellers_ibfk_1` FOREIGN KEY (`booking`) REFERENCES `bookings` (`bookingId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_auth`) REFERENCES `auth` (`authId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
