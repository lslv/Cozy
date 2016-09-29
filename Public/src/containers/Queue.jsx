import React, {Component} from 'react'
import vis from 'vis'
import _ from 'lodash'

export default class Queue extends Component{
	constructor(props){
		super(props)
		this.state={
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
				edges.push({to:queueInOrder[i].userId, from:queueInOrder[i+1].userId, arrows:'from'})
			}
			else
                edges.push({to:queueInOrder[i].userId, from:queueInOrder[0].userId, arrows:'from'})
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
			},
			interaction:{
				// dragNodes:false,
				// dragView: false,
				// hideEdgesOnDrag: false,
				// hideNodesOnDrag: false,
				// hover: false,
				// hoverConnectedEdges: false,
				// keyboard: {
				// 	enabled: false,
				// 	speed: {x: 10, y: 10, zoom: 0.02},
				// 	bindToWindow: false
				// },
				// multiselect: false,
				// navigationButtons: false,
				// selectable: false,
				// selectConnectedEdges: false,
				// tooltipDelay: 300,
				zoomView: false
			}

		}

    // initialize your network!
		var network = new vis.Network(container, data, options)

		this.setState({network:network})

          
	}

	render(){

		if(this.state.network){
			var nodeIdList=this.state.nodes.map((node)=> node.id )
			console.log('center the queue network')
			this.state.network.fit({nodes:nodeIdList})

		}
		console.log('parent panel state: ',this.props.open)
		if(this.props.open){
			this.props.onceForceUpdate()
		}
		return <div onClick={(event)=>event.stopPropagation()} className="network" id={`mynetwork${this.props.chore.id}`}></div>
	}

}