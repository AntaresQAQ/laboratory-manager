import bcrypt from 'bcrypt';

bcrypt.hash('admin', 10).then(password => {
  console.log(
    `INSERT INTO \`user\` (\`username\`,\`password\`,\`type\`) VALUES ('admin','${password}','ADMIN')`,
  );
});
