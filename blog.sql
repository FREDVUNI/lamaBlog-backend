-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2022 at 02:03 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `desc` text NOT NULL,
  `cat` varchar(150) NOT NULL,
  `img` varchar(180) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `desc`, `cat`, `img`, `date_created`, `uid`) VALUES
(1, 'How not knowing wine societies makes you a rookie.', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);\">Ways your mother lied to you about civil societies. Unbelievable world flag success stories. How political cultures can make you sick. Why analysis groups are the new black. How wine societies are the new wine societies. How military records are making the world a better place. Education cities by the numbers. 18 insane (but true) things about elementary schools. Why military records are killing you. radars can help you predict the future.</span></p>', 'cinema', '1665918701503.jpg', '2022-10-16 11:11:41', 1),
(2, 'How hollywood got showbiz days all wrong', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(68, 68, 68);\">6 least favorite political parties. Why new technologies beat peanut butter on pancakes. Why you\'ll never succeed at political polls. How economic indicators are making the world a better place. 9 things about weather radars your kids don\'t want you to know. How economic indicators make you a better lover. The unconventional guide to economic cycles. Unbelievable economic indicator success stories.&nbsp;</span></p>', 'cinema', '1665918954366.jpg', '2022-10-16 11:15:54', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(180) NOT NULL,
  `img` varchar(200) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `img`, `date_created`) VALUES
(1, 'Fred', 'fredvuni809@gmail.com', '$2a$10$uFTmOsihbUj.ysoe4q.ag.fWxzAcufqGnFsaIsCAleMY3jXs8dlMm', '', '2022-10-11 12:15:16'),
(2, 'vuni', 'vuni809@gmail.com', '$2a$10$GJ5U1b9qi/3rNA5vq.tk6OYUCIKwpPPSn5Ot6H8atBMLRyHh7xTG2', '', '2022-10-11 12:30:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
