import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all()
    const balance      = transactionsRepository.getBalance()
    return response.json( {transactions, balance} )
    } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

transactionRouter.get('/balance', (request, response) => {
  try {
    const transactions = transactionsRepository.all()
    return response.json(transactions)
    } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body
    const CreateTransaction = new CreateTransactionService(transactionsRepository, )    
    const transaction       = CreateTransaction.execute({ title, value, type })
    return response.json(transaction)
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

export default transactionRouter;
