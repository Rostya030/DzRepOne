const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

const account = {
  balance: 0,
  transactions: [],

  createTransaction(amount, type) {
    return {
      id: Math.floor(Math.random() * 1000000),
      type,
      amount,
    };
  },

  deposit(amount) {
    const transaction = this.createTransaction(amount, Transaction.DEPOSIT);
    this.transactions.push(transaction);
    this.balance += amount;
  },

  withdraw(amount) {
    if (amount > this.balance) {
      console.log(`Зняття ${amount} неможливе: недостатньо коштів на рахунку.`);
      return;
    }

    const transaction = this.createTransaction(amount, Transaction.WITHDRAW);
    this.transactions.push(transaction);
    this.balance -= amount;
  },

  getBalance() {
    return this.balance;
  },

  getTransactionDetails(id) {
    for (const transaction of this.transactions) {
      const { id: transactionId } = transaction;
      if (transactionId === id) {
        return transaction;
      }
    }
    return null;
  },

  getTransactionTotal(type) {
    let total = 0;

    for (const { type: transactionType, amount } of this.transactions) {
      if (transactionType === type) {
        total += amount;
      }
    }

    return total;
  },
};

account.deposit(1000);
account.deposit(500);
account.withdraw(300);
account.withdraw(2000);

console.log('Поточний баланс:', account.getBalance());

console.log('Усі транзакції:', account.transactions);

console.log('Загальна сума депозитів:', account.getTransactionTotal(Transaction.DEPOSIT));
console.log('Загальна сума зняття:', account.getTransactionTotal(Transaction.WITHDRAW));

const firstTransactionId = account.transactions[0].id;
console.log('Деталі першої транзакції:', account.getTransactionDetails(firstTransactionId));