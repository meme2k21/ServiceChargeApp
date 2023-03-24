import Head from "next/head";
import React, {useState} from "react";
import styles from "../../styles/Home.module.css";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { tickets: data },
  };
};

// for ticketManagement

function Tickets({ tickets }) {
  const [ticketHealth, setTicketHealth] = useState('Ticket Health');
  const [ticketStatus, setTicketStatus] = useState('Ticket Status');
  const [ticketYearCreated, setTicketYearCreated] = useState('Year Created');

  //Modal Delete component
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
      setShowModal(true);
      console.log(showModal);
  };

  const handleDelete = () => {
      // Perform delete action
      handleCancel();      
  };

  const handleCancel = () => {
      setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Tickets</title>
        <meta name="keywords" content="tickets" />
      </Head>
      <div  style={{ backgroundColor: '#D9D9D9', paddingLeft:'10px', fontWeight:'bold', width: '100vw-10px', height: '30px', display: 'flex', alignItems: 'center' }}> Search Filter</div>
      <div  style={{ backgroundColor: 'white', border:'5px solid white', borderColor:'#D9D9D9', paddingLeft:'10px', fontWeight:'bold', width: '100vw-10px', height: '60px', display: 'flex', alignItems: 'center', justifyContent:'space-between' }}> 
        <div style={{display:'flex', alignItems:'center'}}>
          <select value={ticketHealth} style={{opacity: ticketHealth ==="Ticket Health"?0.5:1, border:'1px solid black', marginRight:'20px', height:'40px', width:'227px', fontStyle:'italic'}} >
            <option disabled>{ticketHealth}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select value={ticketStatus} style={{border:'1px solid black', marginRight:'20px', height:'40px', width:'227px', fontStyle:'italic'}} >
            <option disabled>{ticketStatus}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select value={ticketYearCreated} style={{border:'1px solid black', marginRight:'20px', height:'40px', width:'227px', fontStyle:'italic'}} >
            <option disabled>{ticketYearCreated}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div style={{display:'flex', alignItems:'center'}}>
          <button style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px', marginRight:'10px', height:'40px', width:'227px', fontStyle:'italic'}} >Search</button>
          <button style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px', marginRight:'10px', height:'40px', width:'227px', fontStyle:'italic'}} >Clear</button>
        </div>
      </div>
      <div style={{marginTop:'10px', marginBottom: '-40px'}}>
        <input type='search' placeholder='Search' style={{border: '1px solid black', color:'black', height:'40px', width:'350px'}}></input>
        <button type='search' style={{backgroundColor:'#D9D9D9', fontSize:'16px', marginRight:'15px', color:'black', height:'40px', width:'227px', float:'right'}}>Add Email Reminder</button>
        <select type='search' style={{backgroundColor:'#D9D9D9', fontSize:'16px', marginRight:'10px', color:'black', height:'40px', width:'227px', float:'right'}}>
          <option>Ticket Number</option>
          <option>Ticket Subject</option>
          <option>Ticket Status</option>
        </select>
      </div>
      <br /><br />
      <table style={{borderBottom:'2px solid black', marginBottom:'10px'}}>
        <thead>
          <tr style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px'}}>
            <td>Ticket Number</td>
            <td>Ticket Subject</td>
            <td>Ticket Description</td>
            <td>Date Created</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td onClick={handleShowModal}>
              <a href="" onClick={(e)=> e.preventDefault()} title='update'>Case Filed</a>
            </td>
              {showModal && <Modal onYes={handleDelete} onNo={handleCancel} />}
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td onClick={handleShowModal}>
              <a href="" onClick={(e)=> e.preventDefault()} title='update'>Case Filed</a>
            </td>
              {showModal && <Modal onYes={handleDelete} onNo={handleCancel} />}
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td onClick={handleShowModal}>
              <a href="" onClick={(e)=> e.preventDefault()} title='update'>Case Filed</a>
            </td>
              {showModal && <Modal onYes={handleDelete} onNo={handleCancel} />}
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td onClick={handleShowModal}>
              <a href="" onClick={(e)=> e.preventDefault()} title='update'>Case Filed</a>
            </td>
              {showModal && <Modal onYes={handleDelete} onNo={handleCancel} />}
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td onClick={handleShowModal}>
              <a href="" onClick={(e)=> e.preventDefault()} title='update'>Case Filed</a>
            </td>
              {showModal && <Modal onYes={handleDelete} onNo={handleCancel} />}
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td onClick={handleShowModal}>
              <a href="" onClick={(e)=> e.preventDefault()} title='update'>Case Filed</a>
            </td>
              {showModal && <Modal onYes={handleDelete} onNo={handleCancel} />}
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td onClick={handleShowModal}>
              <a href="" onClick={(e)=> e.preventDefault()} title='update'>Case Filed</a>
            </td>
              {showModal && <Modal onYes={handleDelete} onNo={handleCancel} />}
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td onClick={handleShowModal}>
              <a href="" onClick={(e)=> e.preventDefault()} title='update'>Case Filed</a>
            </td>
              {showModal && <Modal onYes={handleDelete} onNo={handleCancel} />}
          </tr>
        </tbody>
      </table>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', marginBottom:'-50px' }}>
        <label style={{marginLeft:'20px'}}>Showing 8 out of 20 entries</label>
        <div style={{float:'right'}}>
            <button style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px', marginRight:'10px', height:'40px', width:'227px', fontStyle:'italic'}} >Previous</button>
            <button style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px', marginRight:'10px', height:'40px', width:'227px', fontStyle:'italic'}} >Next</button>
          </div>
        </div>
    </>
  );
}

export default Tickets;



export function Modal( {onYes, onNo}) {

  return (
    <div 
      style={{ 
        position: 'fixed',
        display: "flex", 
        backgroundColor: "rgba(0, 0, 0, 0.1)", 
        top: "0", 
        left: "0", 
        width: "100vw", 
        height: "100%", 
        zIndex: "1",
        alignItems:'center',
        justifyContent: 'center' }}>
          <div 
            className="modal-content position-absolute" 
            style={{ 
              backgroundColor: "#333333",
              border: "1px solid #888", 
              width: "80%", 
              maxWidth: "600px", 
              padding: "20px" }}>
              <h6 style={{ color: 'white', textAlign: 'center' }}>Are you sure you want to delete?</h6>
              <br />
              <div className="button-group" style={{ textAlign: 'right', marginTop: "-1em" }}>
                  <button className="button danger" style={{ width: '7em', background:'#963634' }} onClick={onYes}>Yes</button>
                  <button className="button" style={{ width: '7em', marginLeft: "2em", background:'#963634'  }} onClick={onNo}>No</button>
              </div>
          </div>
    </div>
);
}