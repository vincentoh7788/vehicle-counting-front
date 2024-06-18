import {useEffect,useState} from 'react'
import axios from 'axios';
import NavBar from './NavBar';
import { API_HOST } from "./config";
type Props = {
    token: string;
    setToken: (token: string) => void;
  };
const History: React.FC<Props> = (props) => {
    const [result, setResult] = useState<string[][]>([]);
    useEffect(() => {
        const fetchResult = async () => {
          try {
            const resp = await axios.get(`${API_HOST}/getresult`,{
              headers: {
                Authorization: `Bearer ${props.token}`,
                'ngrok-skip-browser-warning': true
              }
            
            });
            setResult(resp.data);
            if(resp.data.access_token){
              props.setToken(resp.data.access_token);
            }
          } catch (error) {
            console.error('Failed to fetch result:', error);
          }
        };
    
        fetchResult();
      }, [props.token]);
      const deleteResult = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this result?')) {
        try {
          const response = await axios.delete(`${API_HOST}/deleteresult?id=${id}`,{
            headers: {
              Authorization: `Bearer ${props.token}`,
              'ngrok-skip-browser-warning': true
            }
          });
          console.log(response.data);
          // Refresh the results or handle the response as needed
          if(response.status === 200){
            setResult(result.filter((item) => item[0] !== id));
          }
        } catch (error) {
          console.error(error);
        }
      }
      };
  return (
    <div>
        <NavBar></NavBar>
        <h1>Result</h1>
        {result ? (
          <div className = "responsive-tbl">
      <table className ="table table-bordered table-hover">
        <thead>
          <tr>
            
            <th>Video Link</th>
            <th>Time</th>
            <th>Bicycle In</th>
            <th>Bicycle Out</th>
            <th>Bus In</th>
            <th>Bus Out</th>
            <th>Car In</th>
            <th>Car Out</th>
            <th>Motorcycle In</th>
            <th>Motorcycle Out</th>
            <th>Pedestrian In</th>
            <th>Pedestrian Out</th>
            <th>Truck In</th>
            <th>Truck Out</th>
          </tr>
        </thead>
        <tbody>
          {result.map((item:string[], index:number) => (
            <tr key={index}>
              <td><a target = "_blank" href={`${API_HOST}/getvideo?filename=${item[1]}`}>{item[1]}</a>
              <button className = "btn btn-danger" onClick={() => deleteResult(item[0])}>Delete</button>
              </td>
              <td>{item[2]}</td>
              <td>{item[3][0]}</td>
              <td>{item[4][0]}</td>
              <td>{item[3][1]}</td>
              <td>{item[4][1]}</td>
              <td>{item[3][2]}</td>
              <td>{item[4][2]}</td>
              <td>{item[3][3]}</td>
              <td>{item[4][3]}</td>
              <td>{item[3][4]}</td>
              <td>{item[4][4]}</td>
              <td>{item[3][5]}</td>
              <td>{item[4][5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    ) : 'Loading...'}
    </div>
  )
}

export default History