import React, { useState } from 'react';
import {
  Grid,
  Box,
  Card,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Badge,
  Paper,
  InputAdornment,
  Chip,
  Typography
} from '@mui/material';
import {
  IconSend,
  IconSearch,
  IconPaperclip,
  IconPhone,
  IconVideo,
  IconDots
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';

const MessagesChat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      lastMessage: 'Thanks for the preview photos!',
      time: '10:30 AM',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: 'MG',
      lastMessage: 'Can we reschedule the session?',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Lisa Chen',
      avatar: 'LC',
      lastMessage: 'The photos look amazing!',
      time: '2 days ago',
      unread: 0,
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'client',
      text: 'Hi! I wanted to ask about the wedding package',
      time: '10:15 AM'
    },
    {
      id: 2,
      sender: 'me',
      text: 'Hello! Of course, I would be happy to help. Which package are you interested in?',
      time: '10:16 AM'
    },
    {
      id: 3,
      sender: 'client',
      text: 'I am looking at the Premium package. Does it include engagement photos?',
      time: '10:18 AM'
    },
    {
      id: 4,
      sender: 'me',
      text: 'Yes! The Premium package includes a complimentary engagement session.',
      time: '10:20 AM'
    }
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <PageContainer title="Messages & Chat" description="Chat with clients">
      <Box>
        <Card sx={{ height: 'calc(100vh - 200px)', display: 'flex' }}>
          <Box sx={{ width: 320, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
            <Box p={2}>
              <Typography variant="h5" fontWeight="600" mb={2}>Messages</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Search conversations..."
                InputProps={{
                  startAdornment: <InputAdornment position="start"><IconSearch size={20} /></InputAdornment>
                }}
              />
            </Box>
            <Divider />
            <List sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
              {conversations.map((conv) => (
                <ListItem
                  key={conv.id}
                  button
                  selected={selectedChat === conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  sx={{ py: 2 }}
                >
                  <ListItemAvatar>
                    <Badge color="success" variant="dot" invisible={!conv.online} overlap="circular">
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{conv.avatar}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle2" fontWeight="600">{conv.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{conv.time}</Typography>
                      </Box>
                    }
                    secondary={
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 180 }}>
                          {conv.lastMessage}
                        </Typography>
                        {conv.unread > 0 && <Chip label={conv.unread} size="small" color="primary" />}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Badge color="success" variant="dot" invisible={!selectedConversation?.online}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>{selectedConversation?.avatar}</Avatar>
                </Badge>
                <Box>
                  <Typography variant="subtitle1" fontWeight="600">{selectedConversation?.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedConversation?.online ? 'Online' : 'Offline'}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" gap={1}>
                <IconButton size="small"><IconPhone size={20} /></IconButton>
                <IconButton size="small"><IconVideo size={20} /></IconButton>
                <IconButton size="small"><IconDots size={20} /></IconButton>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3, bgcolor: 'grey.50' }}>
              {messages.map((message) => (
                <Box key={message.id} display="flex" justifyContent={message.sender === 'me' ? 'flex-end' : 'flex-start'} mb={2}>
                  <Paper sx={{ p: 2, maxWidth: '70%', bgcolor: message.sender === 'me' ? 'primary.main' : 'white', color: message.sender === 'me' ? 'white' : 'text.primary' }}>
                    <Typography variant="body2" mb={0.5}>{message.text}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', textAlign: 'right' }}>
                      {message.time}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Box display="flex" gap={1}>
                <IconButton size="small"><IconPaperclip size={20} /></IconButton>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                  <IconSend size={20} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default MessagesChat;
