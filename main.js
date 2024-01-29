import { faker } from "@faker-js/faker";
import inquirer from "inquirer";
class customer {
    firstName;
    lastName;
    age;
    gender;
    mobileNo;
    accountNo;
    constructor(fName, lName, age, gender, mobNo, accNo) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobileNo = mobNo;
        this.accountNo = accNo;
    }
}
class bank {
    customers = [];
    account = [];
    addCustomer(obj) {
        this.customers.push(obj);
    }
    addAccountNUmber(obj) {
        this.account.push(obj);
    }
    accountUpdate(accObj) {
        let newAccounts = myBank.account.filter((acc) => acc.accNumber !== accObj.accNumber);
        this.account = [...newAccounts, accObj];
    }
}
let myBank = new bank();
// create customers
for (let i = 1; i <= 5; i++) {
    let fName = faker.person.firstName("female");
    let lName = faker.person.lastName();
    let phoneNum = parseInt(faker.string.numeric("+92##########"));
    let cus = new customer(fName, lName, 25 + i, "female", phoneNum, 1000 + i);
    myBank.addCustomer(cus);
    myBank.addAccountNUmber({ accNumber: cus.accountNo, balance: 1000 * i });
    // console.log(myBank)
}
// bank functionality
async function bankService(bank) {
    do {
        let service = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "What Would You Like To Do :",
            choices: ["View Balance", "Cash Withdraw", "Cash Deposit"]
        });
        // View Balance
        if (service.select == "View Balance") {
            let ans = await inquirer.prompt({
                type: "number",
                name: "accNum",
                message: "Please Enter Your Account Number: ",
            });
            // find account
            let account = myBank.account.find((acc) => acc.accNumber == ans.accNum);
            if (!account) {
                console.log("Invalid User");
            }
            if (account) {
                let name = myBank.customers.find((item) => {
                    item.accountNo == account?.accNumber;
                });
                console.log(`Dear ${name?.firstName} ${name?.firstName} Your Balance Ammount is ${account.balance}`);
            }
        }
        // Cash Withdraw
        if (service.select == "Cash Withdraw") {
            let ans = await inquirer.prompt({
                type: "number",
                name: "accNum",
                message: "Please Enter Your Account Number: ",
            });
            let account = myBank.account.find((acc) => acc.accNumber == ans.accNum);
            if (!account) {
                console.log("Invalid User");
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    name: "amount",
                    message: "Please Enter The Amount: ",
                });
                let newBalance = account.balance - ans.amount;
                myBank.accountUpdate({ accNumber: account.accNumber, balance: newBalance });
            }
        }
        // Cash Deposit
        if (service.select == "Cash Deposit") {
            let ans = await inquirer.prompt({
                type: "number",
                name: "accNum",
                message: "Please Enter Your Account Number: ",
            });
            let account = myBank.account.find((acc) => acc.accNumber == ans.accNum);
            if (!account) {
                console.log("Invalid User");
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    name: "amount",
                    message: "Please Enter The Amount: ",
                });
                let newBalance = account.balance + ans.amount;
                myBank.accountUpdate({ accNumber: account.accNumber, balance: newBalance });
                console.log();
            }
        }
    } while (true);
}
bankService(myBank);
