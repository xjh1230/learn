import  React  from 'react';
import { Text,TouchableOpacity,Dimensions,View,StyleSheet,Switch} from 'react-native'
//明确状态归属，合理切分组件
const {width,height}=Dimensions.get('window')
const cellwidth = width*0.3
export default function App() {
    const [isSingle,setIsSingle]=React.useState(true)
    const [selectedIndex,setSelectedIndex] = React.useState(-1)
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                    <Text>单选</Text>
                    <Switch style={styles.switchOption} value={isSingle} onValueChange={setIsSingle}>

                    </Switch>
            </View>
            <View style={styles.innerContainer}>
                {
                    isSingle?[...new Array(9)].map((_,i)=>{
                        return (
                            <TouchableOpacity key={i} onPress={()=>setSelectedIndex(i) } style={[styles.cell,selectedIndex==i&&{backgroundColor:'blue'}]} ></TouchableOpacity>
                        )
                    }):[... new Array(9)].map((_,i)=>{
                        return <Cell key={i}></Cell>
                    })
                }
            </View>
        </View>
    )
}

function Cell() {
    const [selectEd,setSelected]=React.useState(false)
    return <TouchableOpacity onPress={()=>setSelected(!selectEd)} style={[styles.cell,selectEd&&{backgroundColor:'blue'}]}></TouchableOpacity>
}

const styles = StyleSheet.create({
    container:{},
    innerContainer:{
        marginTop:50,
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    switchOption:{
        marginLeft:10
    },
    cell:{
        width:cellwidth,
        height:cellwidth,
        borderWidth:1,
        borderColor:'green'
    }
})
