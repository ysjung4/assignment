const Sequelize = require('sequelize');


var sequelize = new Sequelize('dd6n3hics67c2u', 'xttqmxtnkgcatn', '4702257641901ab4bcc6ecd0b9708a3942db40034b87ae06d2af58c92369920f', {
    host: 'ec2-107-22-183-40.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});
sequelize.authenticate().then( () => {
    console.log('Connection has been established successfully!');
}).catch( (err) => {
    console.log("Unable to connect the database: " + err);
});

var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addresCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});


var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    },
    departmentName: Sequelize.STRING
});


module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then( () => {
            resolve();
        }).catch(()=>{
            reject();
        });
    });
};

module.exports.getAllEmployees = function () {
    return new Promise(function (resolve, reject) {
        Employee.findAll().then(function (data) {
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                status: status
            }
        }).then(function (data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                department: department
            }
        }).then(function (data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                employeeManagerNum: manager
            }
        }).then(function (data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                employeeNum: num
            }
        }).then(function (data) {
            resolve(data[0]);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.deleteEmployeeByNum = function(empNum){
    return new Promise(function (resolve, reject) {
        Employee.destroy({
            where: {
                employeeNum: empNum
            }
        }).then(function () {
            resolve();
        }).catch((err) => {
            reject("unable to delete employee");
        });
    });
}

module.exports.getDepartmentById = function (id) {
    return new Promise(function (resolve, reject) {
        Department.findAll({
            where: {
                departmentId: id
            }
        }).then(function (data) {
            resolve(data[0]);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                isManager: true
            }
        }).then(function (data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getDepartments = function () {
    return new Promise(function (resolve, reject) {
        Department.findAll().then(function (data) {
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results");
        });
    });

};


module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if(employeeData[prop] == '')
                employeeData[prop] = null;
        }

        Employee.create(employeeData).then(() => {
            resolve();
        }).catch((e)=>{
            reject();
        });

    });
};

module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if (employeeData[prop] == '')
                employeeData[prop] = null;
        }

        Employee.update(employeeData, {
            where: { employeeNum: employeeData.employeeNum } 
        }).then(() => {
            resolve();
        }).catch((e) => {
            reject();
        });
    });

};

module.exports.addDepartment = function (departmentData) {
    return new Promise(function (resolve, reject) {

        for (var prop in departmentData) {
            if(departmentData[prop] == '')
                departmentData[prop] = null;
        }

        Department.create(departmentData).then(() => {
            resolve();
        }).catch((e)=>{
            reject();
        });

    });
};

module.exports.updateDepartment = function (departmentData) {
    return new Promise(function (resolve, reject) {

        for (var prop in departmentData) {
            if (departmentData[prop] == '')
                departmentData[prop] = null;
        }

        Department.update(departmentData, {
            where: { departmentId: departmentData.departmentId } 
        }).then(() => {
            resolve();
        }).catch((e) => {
            reject();
        });
    });

};