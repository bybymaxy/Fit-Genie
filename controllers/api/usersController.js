const getUsers = (req, res) => {
    // Handle the GET request for the "/api/users" endpoint here
    // For example, you can retrieve the list of users from a database and send it as a response
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Bob' }
    ];
    res.json(users);
  };
  
  module.exports = getUsers;