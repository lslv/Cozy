import React, {Component} from 'react'
import vis from 'vis'
import _ from 'lodash'

export default class Queue extends Component{
	constructor(props){
		super(props)
		// console.log('queue props in queue component',this.props.queues)
		this.state={
			onceForceUpdate:_.once(this.forceUpdate.bind(this))
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
			},
			interaction:{
			// 	dragNodes:false,
			// 	dragView: false,
			// 	hideEdgesOnDrag: false,
			// 	hideNodesOnDrag: false,
			// 	hover: false,
			// 	hoverConnectedEdges: false,
			// 	keyboard: {
			// 		enabled: false,
			// 		speed: {x: 10, y: 10, zoom: 0.02},
			// 		bindToWindow: false
			// 	},
			// 	multiselect: false,
			// 	navigationButtons: false,
			// 	selectable: false,
			// 	selectConnectedEdges: false,
			// 	tooltipDelay: 300,
				zoomView: false
			}
			//in order to set interactions to false

		}

    // initialize your network!
		var network = new vis.Network(container, data, options)
		// var nodeIdList=nodes.map((node)=> node.id )
		// console.log(nodeIdList)
		// network.fit({nodes:nodeIdList})
		// network.redraw()
		// network.moveTo({position:{x:-50,y:+50}})
		// console.log(network.fit)
		
		// this.setState({network:network}, ()=>{
		// 	console.log('network state saved')
		// 	this.setState({stuff:'stuff'},()=>{
		// 		console.log('trigger rerender')
		// 		var nodeIdList=this.state.nodes.map((node)=> node.id )
		// 		this.state.network.fit({nodes:nodeIdList})
		// 	})
		// })
		this.setState({network:network})

          
	}

	shouldComponentUpdate(nextProps, nextState) {
		// console.log('***********')
		// console.log(nextProps)
		// console.log(nextState)
		return true
	}

	render(){

		if(this.state.network){
			var nodeIdList=this.state.nodes.map((node)=> node.id )
			console.log('center the queue network')
			this.state.network.fit({nodes:nodeIdList})

		}
		console.log('parent panel state: ',this.props.open)
		if(this.props.open){
			this.state.onceForceUpdate()
		}
		// else{
		// 	this.setState({onceForceUpdate:_.once(this.forceUpdate.bind(this)), once:'twice' })
		// 	this.setState({once:'once'})
		// }
		return <div className="network" id={`mynetwork${this.props.chore.id}`}></div>
	}

}