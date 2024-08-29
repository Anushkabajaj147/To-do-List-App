import { View, Text, ScrollView, Touchable, TouchableOpacity, Modal, TextInput,Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
  

export default function App(){
  
  const intialState={
   id:0,
   title:"",
   description:"",
   completed:false,

 }
 const[todo,setTodo]=useState([]);

 const [showModal,setshowModal] =useState(false);
 const[newTodo,setNewTodo]=useState(intialState)
 const getTodos=async()=>{
  const todos= await  AsyncStorage.getItem("todo");

  setTodo(JSON.parse(todos)?JSON.parse(todos):[]);
 }
 useEffect(()=>{
   getTodos()

 },[]);

const clear=()=>setNewTodo(intialState);

 const addTodo=()=>{
   if(!newTodo.title|| !newTodo.description){
     alert ("Please enter all the details.")
     return;
   }
   newTodo.id=todo.length+1;
   const updatedTodo=[newTodo,...todo];
   setTodo(updatedTodo);
   AsyncStorage.setItem("todo",JSON.stringify(updatedTodo));
  
   setshowModal(false);
   clear();
 }
 const handleChange=(title,value)=>setNewTodo({...newTodo,[title] : value});
 const updatedTodo=item=>{
   const itemToBeUploaded=todo.filter(todoItem=>todoItem.id==item.id);
    itemToBeUploaded[0].completed=!itemToBeUploaded[0].completed; 
    const remainingItems=todo.filter(todoItem=>todoItem.id!=item.id)
    const updatedTodo=[...itemToBeUploaded,...remainingItems];
    setTodo(updatedTodo);
    AsyncStorage.setItem('todo',JSON.stringify(updatedTodo)); 
   }
 const displayTodo=(item)=>(
   <TouchableOpacity  onPress={()=> Alert.alert(`${item.title}`, `${item.description}`, [
     {
       text: item.completed ? "Mark InProgress": "Mark Completed" ,
       onPress: () => updatedTodo(item),
     },
     {
       text: "Ok",
       style: "cancel",
     },
   ])
 }
 style={{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingVertical:10,borderBottomColor:"#000",borderBottomWidth:1 
 }}>
     <BouncyCheckbox isChecked={item.completed? true:false} fillcolor='blue' onPress={()=>updatedTodo(item)} />
    <Text style={{color:"#000",fontSize:16,width:'90%',textDecorationLine:item.completed?"line-through":'none'}}>{item.title}</Text>
   </TouchableOpacity>
 )
 

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#d2b48c"}}>  
    <View style={{padding:10}}>
    <View style={{display:'flex',flexDirection:"row",justifyContent:"space-between",paddingVertical:20}}>
     <View>
     <Text style={{colors:"#000",textAlign:"center",fontSize:34,marginStart:"15%",fontWeight:"bold"}}>TO DO LIST ITEMS  </Text>
     
       <Text style={{fontsize:16}}>{todo.length}{todo.length==1?   'task': 'tasks'}  for you!</Text>
       </View>
     </View>
     <Text style={{color:'#000',fontsize:40,fontWeight:'bold'}}>TO DO 📃</Text>
     <ScrollView>
       <View  style={{height:250}}>
         {
           todo.map(item=>!item.completed?displayTodo(item):null)
         }
       </View>
     </ScrollView>
     <Text style={{color:'#000',fontsize:40,fontWeight:'bold'}}>COMPLETED ✅</Text>
     <ScrollView>
     <View  style={{height:250}}>
     {
           todo.map(item=>item.completed?displayTodo(item):null)
         }
     </View>
     </ScrollView>
     <View style={{display:'flex',justifyContent:'flex-end',flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>setshowModal(true)} style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"lightblue",borderRadius:100,width:60,height:60 }}>
       <Text style={{fontsize:46,fontWeight:'#fff'}}>+</Text>
      </TouchableOpacity>
       </View>
        <Modal visible={showModal} animationType='slide' onRequestClose={()=>setshowModal(false)}>
        <View style={{flex:1,backgroundColor:"#d2b48c"}}>  
       <View style={{padding:10}}>
       <View style={{display:'flex',flexDirection:"row",justifyContent:"space-between",paddingVertical:20}}>
     <View>
     <Text style={{colors:"#000",textAlign:"center",fontSize:34,marginStart:"15%",fontWeight:"bold"}}>TO DO LIST ITEMS  </Text>
      
       <Text style={{fontsize:16}}>{todo.length}{todo.length==1? 'task':'tasks'} for you!</Text>
       </View>
     </View>
     <Text style={{ marginVertical:10,colors:"#000",fontSize:28,fontWeight:'bold'}}>Add A Todo Item</Text>
     <TextInput placeholder='Title' value={newTodo.title}  onChangeText={(title)=>handleChange('title',title)}style={{ backgroundColor:"rgb(220,220,220)",borderRadius:10,paddingHorizontal:10,marginVertical:10}}/>
     <TextInput placeholder='Description' value={newTodo.description} onChangeText={(desc)=>handleChange('description',desc)}style={{ backgroundColor:"rgb(220,220,220)",borderRadius:10,paddingHorizontal:10,marginVertical:10}} multiline={true} numberOfLines={6}/> 
       <View style={{width:'100%',alignItems:"center",marginTop:10}}> 
         <TouchableOpacity  onPress={addTodo} style={{backgroundColor:"#8b4513",width:100,borderRadius:10,alignItems:'center' ,padding:10}}>
           <Text style={{color:"#fff" ,fontsize:22,textAlign:"center"}} >Add</Text>
         </TouchableOpacity>
       </View>
        </View>
        </View>
       </Modal>

    </View>
   </View>
   
   

);
};



