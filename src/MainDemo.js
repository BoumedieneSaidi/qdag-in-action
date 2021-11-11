import Stat from "./Stat";
import useFetch from "./utils/useFetch";
import { useState } from "react";
import Map from "./Map";
const MainDemo = ({query,runQuery,result, setResult, nodeUrl}) => {
    console.log("Main demo 3mom");
    const [isSpa, setIsSpa] = useState(false)
    const [showRow, setShowRow] = useState(false)
    const [resultType, setResultType] = useState(1)
    const [showResult,setShowResult] = useState(true);
    /** fetch data queries return {"queriesWithResults":[]} */
    const {data,setData} = useFetch(nodeUrl+"/demo");
    /** Run Query: update the existing queries after getting the result*/
    const hundleRunQuery = () => {
        Promise.all([runQuery()]).then(([newData]) => {
            setData(newData);
            setResult(newData["currentQuery"]["result"]);
            setResultType(1);
            setIsSpa(newData["currentQuery"]['isSpatial'] === 'true');
            if(showRow === false)
                setShowRow(true)
            /*if(Object.keys(newQueryWithResult).length !== 0){
                let newArr = [...data["queriesWithResults"]];
                newArr[data["queriesWithResults"].length] = newQueryWithResult;
                setData({"queriesWithResults":newArr});
                setResult(newQueryWithResult["result"]);
                setResultType(1);
                setIsSpa(newQueryWithResult['isSpatial'] === 'true');
                if(showRow === false)
                    setShowRow(true)
            }*/
        });
    }
    /**********************************************************************/
    let resultSection = '';
    if(showResult && resultType === 1)
         resultSection = (<div className="container-fluid">
         <div className="result-div">
             <pre id="result-section" className="result-section">
                    {result}
             </pre>
         </div>
         </div>);
     else if(showResult && resultType === 2)
     resultSection = (<div className="container-fluid" id="mappa"><Map/></div>) ;
      
    return (  
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Query</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                    <button className="btn btn-sm btn-outline-secondary">Clear</button>
                    <button className="btn btn-sm btn-outline-secondary" id="run_btn" onClick = {() => hundleRunQuery()}>Run</button>
                </div>
                </div>
            </div>
            <div className="container-fluid">
                <form>
                    <div className="form-group">
                        <textarea className="form-control" id="QueryTextarea" rows="10" value = {query} onChange={()=>{}}/>
                    </div>
                </form>
            </div>

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Results</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick = {() => {setShowResult(!showResult)}}>Hide</button>
                    {showRow && <button className="btn btn-sm btn-outline-secondary"  onClick = {() => {setResultType(1)}}>Row</button>}
                    {isSpa && <button className="btn btn-sm btn-outline-secondary"  onClick = {() => {setResultType(2)}}>Spatial</button>}
                </div>
                </div>
            </div>
            {resultSection}
            
            
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Stats</h1>
            </div>
            <div className="container-fluid">
                <div>
                    {data && <Stat data={data}/>}
                </div>
            </div>
        
        </main>
    );
}
 
export default MainDemo;