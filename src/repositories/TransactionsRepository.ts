import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  value: number;
  type : 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((soma, cada) => {
      if (cada.type === 'income') return soma += (cada.value);
      else return soma}, 0);
    //====----------------------------------------------====  
    const outcome = this.transactions.reduce((soma, cada) => {
      if (cada.type === 'outcome') return soma += (cada.value);
      else return soma}, 0);
    //====----------------------------------------------====  
    const total  = income - outcome
    const Objeto = { income, outcome, total }
    return Objeto
  }

  public create({title, value, type }: CreateTransactionDTO): Transaction {
    const Objeto = { title, value, type }
    const transaction = new Transaction ( Objeto )
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
