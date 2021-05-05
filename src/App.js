import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import EntryLines from './components/EntryLines';
import MainHeader from './components/MainHeader';
import NewEntryForm from './components/NewEntryForm';
import ModalEdit from './components/ModalEdit';

function App() {

  const [entries, setEntries] = useState(initialEntries);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState();

  useEffect(() => {
    if (!isOpen && entryId) {
      const index = entries.findIndex(entry => entry.id === entryId);
      const newEntries = [...entries];
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense = isExpense;
      setEntries(newEntries);
      resetEntry();
    }
  }, [isOpen]);
    
  const deleteEntry = id => {
    const result = entries.filter(entry => entry.id !== id);
    setEntries(result);
  };

  const editEntry = id => {
    console.log(`edit entry with ID ${id}`);
    if (id) {
      const index = entries.findIndex(entry => entry.id === id);
      const entry = entries[index];

      setEntryId(id);
      setDescription(entry.description);
      setValue(entry.value);
      setIsExpense(entry.isExpense);
      setIsOpen(true);
    }
  }

  const addEntry = () => {
    const result = entries.concat({id: entries.length + 1, description, value, isExpense});
    setEntries(result);
    resetEntry();
  };

  const resetEntry = () => {
    setDescription('');
    setValue('');
    setIsExpense(true);
  }

  return (
    <Container>
      <MainHeader title='Budget' />
      <DisplayBalance title="Your Balance:" value="2,500.53" size="small" />

      <DisplayBalances />
      <MainHeader title='History' type='h3' />
      
      <EntryLines
        entries={entries}
        deleteEntry={deleteEntry}
        editEntry={editEntry} />

      <MainHeader title='Add New Transaction' type='h3' />
      <NewEntryForm
        addEntry={addEntry}
        description={description}
        setDescription={setDescription}
        value={value}
        setValue={setValue}
        isExpense={isExpense}
        setIsExpense={setIsExpense} />

      <ModalEdit
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addEntry={addEntry}
        description={description}
        setDescription={setDescription}
        value={value}
        setValue={setValue}
        isExpense={isExpense}
        setIsExpense={setIsExpense} />
    </Container>
  );
}

export default App;

var initialEntries = [
  {
    id: 1,
    description: 'Work income',
    value: "$1,000",
    isExpense: false
  },
  {
    id: 2,
    description: 'Water bill',
    value: "$20",
    isExpense: true
  },
  {
    id: 3,
    description: 'Rent',
    value: "$300",
    isExpense: true
  },
  {
    id: 4,
    description: 'Power bill',
    value: "$50",
    isExpense: true
  }
]