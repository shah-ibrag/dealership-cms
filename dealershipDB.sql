-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 12, 2024 at 06:47 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dealershipDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cars`
--

CREATE TABLE `Cars` (
  `id` int(11) NOT NULL,
  `make` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Cars`
--

INSERT INTO `Cars` (`id`, `make`, `model`, `price`, `description`, `type_id`, `img_path`) VALUES
(13, 'Toyota', 'Camry', 25000, 'Reliable and fuel-efficient sedan.', 1, 'photos/camry.jpg'),
(14, 'Honda', 'CR-V', 30000, 'Spacious and comfortable SUV.', 2, 'photos/crv.jpg'),
(15, 'Ford', 'F-150', 45000, 'Powerful and durable truck.', 3, 'photos/f150.jpg'),
(16, 'Chevrolet', 'Camaro', 35000, 'Sporty and stylish coupe.', 4, 'photos/camaro.jpg'),
(17, 'Mazda', 'MX-5 Miata', 28000, 'Fun-to-drive convertible.', 5, 'photos/mx5.png'),
(18, 'Volkswagen', 'Golf', 22000, 'Compact and versatile hatchback.', 6, 'photos/golf.jpg'),
(19, 'Subaru', 'Outback', 32000, 'Rugged and reliable wagon.', 7, 'photos/outback.jpg'),
(21, 'Porsche', '911', 90000, 'High-performance sports car.', 9, 'photos/911.jpg'),
(24, 'Chrysler', 'Pacifica', 15000, 'good car', 8, 'photos/pacifica.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `listing_id` int(11) DEFAULT NULL,
  `user` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Comments`
--

INSERT INTO `Comments` (`listing_id`, `user`, `comment`, `date`) VALUES
(13, 'Luc', 'Im Maxwell<br>', '2024-08-11');

-- --------------------------------------------------------

--
-- Table structure for table `Types`
--

CREATE TABLE `Types` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Types`
--

INSERT INTO `Types` (`id`, `type`) VALUES
(1, 'Sedan'),
(2, 'SUV'),
(3, 'Truck'),
(4, 'Coupe'),
(5, 'Convertible'),
(6, 'Hatchback'),
(7, 'Wagon'),
(8, 'Van'),
(9, 'Sports Car'),
(10, 'Electric');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `session_id` char(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`username`, `password`, `session_id`) VALUES
('ghostface', 'killa', '7aacc8a97bda942bf52b81dbdef4e897bebfe974272a9cbff685835a2a0cdfda');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cars`
--
ALTER TABLE `Cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD KEY `listing_id` (`listing_id`);

--
-- Indexes for table `Types`
--
ALTER TABLE `Types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cars`
--
ALTER TABLE `Cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Types`
--
ALTER TABLE `Types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cars`
--
ALTER TABLE `Cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `Types` (`id`);

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `Cars` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
