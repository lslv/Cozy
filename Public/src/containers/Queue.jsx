import React, {Component} from 'react'
import vis from 'vis'

export default class Queue extends Component{
	constructor(props){
		super(props)
		// console.log('queue props in queue component',this.props.queues)
		this.state={
			network:null,
			nodes:null,
			edges:null
		}
	}
	componentDidMount() {
		console.log('after component did mount')
		const {queues} = this.props
		const {chore} = this.props
		const {users}= this.props 
		var choreQueue= queues[this.props.chore.id]
		var queueInOrder=[ ...choreQueue.slice(chore.user_turn), ...choreQueue.slice(0, chore.user_turn) ]
		var nodes= queueInOrder.map((queuePosition,index)=>{        
			if(index===0){
				return {id:users[queuePosition.userId].id, label: users[queuePosition.userId].user_name, color:'lime' }
			}
			return {id:users[queuePosition.userId].id, label: users[queuePosition.userId].user_name }
		})
		nodes= new vis.DataSet(nodes)
		this.setState({nodes})

		var edges=[]

		for(var i=0;i < queueInOrder.length;i++){
			if(i < queueInOrder.length-1){
				edges.push({from:queueInOrder[i].userId, to:queueInOrder[i+1].userId, arrows:'from'})
			}
			else
                edges.push({from:queueInOrder[i].userId, to:queueInOrder[0].userId, arrows:'from'})
		}
		this.setState({edges})
		var edges = new vis.DataSet(edges)

    // create a network
		var container = document.getElementById('mynetwork'+this.props.chore.id)
    // provide the data in the vis format
		var data = {
			nodes: nodes,
			edges: edges
		}
		var options = {
			edges:{
				color:{
					inherit:false,
					color:'#97C2FC',
					highlight:'#97C2FC'
				}
			},
			nodes:{
				shape:'dot',
				size:20
			}
		}

    // initialize your network!
		var network = new vis.Network(container, data, options)
		var nodeIdList=nodes.map((node)=> node.id )
		network.fit({nodes:nodes.map((node)=> node.id )})
		
		this.setState({network})
          
	}

	render(){
		return (
            <div className="network" id={`mynetwork${this.props.chore.id}`}>
            </div>
            )

	}

}