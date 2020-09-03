import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const allBalance = await this.find();
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    allBalance.forEach((transaction: Transaction) => {
      if (transaction.type === `income`) {
        balance.income += transaction.value;
        balance.total += transaction.value;
      }
      if (transaction.type === `outcome`) {
        balance.outcome += transaction.value;
        balance.total -= transaction.value;
      }
    });
    return balance;
  }
}

export default TransactionsRepository;
