import { Container, Header, Statistic } from 'semantic-ui-react';
import './App.css';

function App() {
  return (
    <Container>
      <Header as="h1">Budget</Header>
      <Statistic size="small">
        <Statistic.Label>Your Balance:</Statistic.Label>
        <Statistic.Value>2,500.53</Statistic.Value>
      </Statistic>
    </Container>
  );
}

export default App;
