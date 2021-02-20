import React, {useState, useEffect} from 'react'
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemText, ListItemAvatar, Avatar, List, Grid, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';

const View = ({currentId, setCurrentId}) => {
    const post = useSelector((state) => (currentId ? state.tierlist.find((message) => message._id === currentId) : null));
    const [tier, setTier] = useState(currentId ? post : {title: '', name: '',creator: '',elements: [],});
    useEffect(() => {
        if (post) {
            setTier({title: post.title, name: post.name, creator: post.creator, elements: post.elements});
        } else {
            setTier( {title: '', name: '',creator: '',elements: []});
        }
    }, [currentId]);
    
    return (
        <>
        <List>
            {[...tier.elements].map((e) => {
                return (
                    <ListItem key={e._id}>
                        <img  src={e.image} height='60px'/>
                        <ListItemText>{`${e.title}`} <br/> {`RATING: ${e.rating}`}</ListItemText>
                    </ListItem>
                )
            })}
        </List>
        <Form currentId={currentId} 
        setCurrentId={setCurrentId}
        tier={tier}
        setTier={setTier}/>
        </>
    )
}

export default View
