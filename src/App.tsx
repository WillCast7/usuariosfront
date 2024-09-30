import { useState, useEffect } from 'react';
import './App.css';
import { UserModel } from './model/UserModel';
import { ApiResponseModel } from './model/ApiResponseModel'; // Asegúrate de importar tu modelo
import { useFetch } from './services/rest-apiService';

function App() {
  const [userList, setUserList] = useState<UserModel[]>([]); // Cambiado a un array
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [isSearched, setIsSearched] = useState(false);
  const [valueSearched, setValueSearched] = useState('');
  const [fetchUrl, setFetchUrl] = useState(
    `http://127.0.0.1:8000/api/usuarios?itemsPerPage=${itemsPerPage}&activePage=${activePage}&searched=${isSearched}&valueSearch=${valueSearched}`
  );

  const { data, loading, error } = useFetch<ApiResponseModel>(fetchUrl);

  useEffect(() => {
    if (data && data.success) {
      setUserList(data.data || []);
    } else {
      setUserList([]);
    }
  }, [data]);

  useEffect(() => {
    const newUrl = `http://127.0.0.1:8000/api/usuarios?itemsPerPage=${itemsPerPage}&activePage=${activePage}&searched=${isSearched}&valueSearch=${valueSearched}`;
    setFetchUrl(newUrl);
    console.log(newUrl);
  }, [itemsPerPage, activePage, isSearched, valueSearched]);

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 1) {
      setIsSearched(true);
      setValueSearched(value);
    } else {
      setIsSearched(false);
      setValueSearched(''); 
    }
  };

  return (
    <div className='App'>
      <h1>Test WillCast</h1>
      <div className='card'>
        <input onChange={searchInputChange} />
        <table className="border-separate border border-slate-500">
          <thead>
            <tr>
              <th className='border border-slate-50'>ID</th>
              <th className='border border-slate-50'>Nombre</th>
              <th className='border border-slate-50'>Usuario</th>
              <th className='border border-slate-50'>Correo</th>
              <th className='border border-slate-50'>Telefono</th>
            </tr>
          </thead>
          <tbody>
            {error && <tr><td colSpan={5}>Error: {error}</td></tr>}
            {loading && <tr><td colSpan={5}>Cargando...</td></tr>}
            {userList.map((user: UserModel) => (
              <tr key={user.id}>
                <td className='border border-slate-700'>{user.id}</td>
                <td className='border border-slate-700'>{user.nombre}</td>
                <td className='border border-slate-700'>{user.usuario}</td>
                <td className='border border-slate-700'>{user.correo}</td>
                <td className='border border-slate-700'>{user.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;