-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2023 at 02:53 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Krishna', 'krishna@gmail.com', '$2a$12$dvAHPEZlrR.5mwAUmm8mb.kud33qC3JTkPtIIkXwqe8gBb7GzJe42\r\n'),
(2, 'krishna', 'krishna@gmail.com', '12345'),
(3, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(4, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(5, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(6, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(7, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(8, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(9, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(10, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(13, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(15, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(16, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(17, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(18, 'krishna bhardwaj', 'krishna@gmail.com', '12345'),
(19, 'krishna bhardwaj', 'krishna@gmail.com', '0'),
(20, 'krishna bhardwaj', 'krishna@gmail.com', '0'),
(21, 'krishna bhardwaj', 'krishna@gmail.com', 'password123'),
(22, 'krishna bhardwaj', 'krishna@gmail.com', 'password123'),
(23, 'krishna bhardwaj', 'krishnayyyy@gmail.com', '12345'),
(24, 'krishna bhardwaj', 'krishnayyyy@gmail.com', '12345'),
(25, 'krishna bhardwaj', 'krishnayyyy@gmail.com', '12345'),
(26, 'krishna bhardwaj', 'krishnayyyy@gmail.com', '12345'),
(27, 'krishna bhardwaj', 'krishnayyyy2@gmail.com', '12345'),
(28, 'krishna bhardwaj', 'krishnayyyy2@gmail.com', '12345'),
(29, 'krishna bhardwaj', 'krishnayyyy2@gmail.com', '12345'),
(30, 'krishna 2', 'krishna@gmail.com', '1244'),
(31, 'Krishna Bhardwaj', 'krishna@gmail222sssdsds22222.com', '1244'),
(34, 'Krishna Bhardwaj', 'krishna@gmail.com', '12345678'),
(36, 'krishna bhardwaj', 'krishnadgmail.com', '12345'),
(37, 'krishna bhardwaj', 'krish22nadgmail.com', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
