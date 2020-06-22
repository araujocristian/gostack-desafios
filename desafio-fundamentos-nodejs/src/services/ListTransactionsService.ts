import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Response {
  transactions: Transaction[];
}

class ListTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Response {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    const transactionsList = { transactions, balance };

    return transactionsList;
  }
}

export default ListTransactionsService;
