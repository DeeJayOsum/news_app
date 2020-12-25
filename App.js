import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator,FlatList,Dimensions,Image,TouchableWithoutFeedback,Linking,Share,ImageBackground} from 'react-native';
const {width, height} = Dimensions.get('window');
console.disableYellowBox = true;
const image = { uri:"https://i.pinimg.com/originals/f4/fb/96/f4fb96c7bd35ae0554e0154c1b99e8d2.jpg" };

export default class App extends React.Component{

  state = {
    news: [],
    loading : true
  }

  fetchnews = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=d8dbc339a2034b86a9614a4a3feb0bae')
    .then((res)=>res.json())
    .then((response)=>{
      this.setState({
        news: response.articles,
        loading: false
      })
    })
  }

  componentDidMount(){
    this.fetchnews()
  }
  sharearticle = async article =>{
    try{
      await Share.share({
        message: 'Check this out'+ article
      })
    } catch(error){
      console.log(error)
    }
  }



  render(){
    if(this.state.loading){
      return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#333'}}>
          <ActivityIndicator size="large" color="#333"/>
        </View>
      )
    }
    else{
      return(
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
      <View style = {styles.header}>
        <Text style = {{fontSize:25,color:'#00FFFF'}}>NewsApp By Arjun</Text>
      </View>

      <View style = {styles.news}>
        <FlatList
        data={this.state.news}
        renderItem={({item})=>{
          return(
            <TouchableWithoutFeedback onPress={()=>Linking.openURL(item.url)}>
              <View style  = {{width:width-50,height:200,backgroundColor:'#fff',marginBottom:15,borderRadius:15}}>
                <Image source={{uri:item.urlToImage}} style= {[StyleSheet.absoluteFill,{borderRadius:15}]}/>
                <View style={styles.gradient}>
                  <Text style= {{position:'absolute',bottom:0,color:'#fff',fontSize:20,padding:5}}>{item.title}</Text>
                  <Text style= {{fontSize:16,color:'#fff',position:'absolute',top:0,left:0,padding:5}} onPress={()=>this.sharearticle(item.url)}>🔗</Text>
                </View>

              </View>

            </TouchableWithoutFeedback>
     
          );
        
          }}
        />

      </View>
      </ImageBackground>
    </View>
      )
    }

  }
}


const styles = StyleSheet.create(
  {
    container:{
      flex: 1,
      backgroundColor: '#333'
    },

    header:{
      padding: 65
    },

    news: {
      alignSelf: 'center'
      
    },
    gradient :{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius:15
    }


  }
)