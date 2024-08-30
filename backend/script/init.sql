CREATE USER 'fiveblocks'@'%' IDENTIFIED BY 'password.24!';
GRANT ALL PRIVILEGES ON quiniblockdb.* TO 'fiveblocks'@'%';
FLUSH PRIVILEGES;
