import React, {Component} from 'react'
import vis from 'vis'

export default class Queue extends Component{
	constructor(props){
		super(props)
		console.log('queue props in queue component',this.props.queues)
	}
	componentDidMount() {
            // create an array with nodes
		const {queues} = this.props
		const {chore} = this.props
		const {users}= this.props 
		// var nodes = new vis.DataSet([
  //       {id: 1, label: 'Node 1'},
  //       {id: 2, label: 'Node 2'},
  //       {id: 3, label: 'Node 3'},
  //       {id: 4, label: 'Node 4'},
  //       {id: 5, label: 'Node 5'}
		// ])

		var choreQueue= queues[this.props.chore.id]
		var queueInOrder=[ ...choreQueue.slice(chore.user_turn), ...choreQueue.slice(0, chore.user_turn) ]
		var nodes= queueInOrder.map((queuePosition,index)=>{        
			// if(index< queues[this.props.chore.id].length-1){

   //          }

			return {id:users[queuePosition.userId].id, label: users[queuePosition.userId].user_name }
			// 	return (
   //                  <span key={queuePosition.id}>
   //                  { `${users[queuePosition.userId].user_name}\'s` } Turn {'<'}-  
   //                  </span>
   //                  )
			// else
   //              return (
   //                  <span key={queuePosition.id}>
   //                  { `${users[queuePosition.userId].user_name}\'s` } Turn 
   //                  </span>
   //                  )
		})

		nodes= new vis.DataSet(nodes)

		var edges=[]

		for(var i=0;i < queueInOrder.length;i++){
			if(i < queueInOrder.length-1)
				edges.push({from:queueInOrder[i].userId, to:queueInOrder[i+1].userId})
			else
                edges.push({from:queueInOrder[i].userId, to:queueInOrder[0].userId})
		}

    // create an array with edges
		// var edges = new vis.DataSet([
  //       {from: 1, to: 3},
  //       {from: 1, to: 2},
  //       {from: 2, to: 4},
  //       {from: 2, to: 5}
		// ])
		var edges = new vis.DataSet(edges)

    // create a network
		var container = document.getElementById('mynetwork'+this.props.chore.id)

    // provide the data in the vis format
		var data = {
			nodes: nodes,
			edges: edges
		}
		var options = {}

    // initialize your network!
		var network = new vis.Network(container, data, options)
          
	}
	render(){
		return (
            <div className="network" id={`mynetwork${this.props.chore.id}`}>
            </div>
            )

	}

}