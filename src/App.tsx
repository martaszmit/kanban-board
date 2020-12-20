import React, {useEffect} from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {useSelector} from "react-redux";
import {getColumnsData, getTaskForColumns} from "./store/tasks/TaskSelectors";
import Column from "./components/column/Column";
import {RootState} from "./store";


function App() {
    const taskColumn = useSelector((state: RootState) => getTaskForColumns(state))
    const columnData = useSelector((state: RootState) => getColumnsData(state))

    useEffect(() => {
        window.addEventListener("beforeunload", handleLocalStorageData);
        return () => window.removeEventListener('beforeunload', handleLocalStorageData)
    })

    const handleLocalStorageData = () => {
        localStorage.setItem('columnData', JSON.stringify(columnData))
    }

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#228000'
            }
        }
    })

  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <Column title='To do' list={taskColumn(0)} columnIndex={0}/>
              <Column title='In progress' list={taskColumn(1)} columnIndex={1}/>
              <Column title='Complete' list={taskColumn(2)} columnIndex={2}/>
          </div>
      </ThemeProvider>
  );
}

export default App;