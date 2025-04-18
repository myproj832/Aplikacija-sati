import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import { getTicketDetails, addTicketComment } from './api';
import styles from './TicketDetailsStyles';

const TicketDetailsScreen = ({ route, navigation }) => {
  const { ticketId, userId } = route.params;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchTicketDetails();
  }, []);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const response = await getTicketDetails(ticketId);
      if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        console.log("📌 Ticket Data:", response);
        setTicket(response);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch ticket details.');
    } finally {
      setLoading(false);
    }
  };



  const handleAddComment = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Comment cannot be empty.');
      return;
    }

    const response = await addTicketComment(ticketId, userId, comment);

    if (response.message) {
      setComment('');
      fetchTicketDetails(); // 🔄 Osvježi komentare nakon dodavanja
    } else {
      Alert.alert('Error', response.error || 'Failed to add comment.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) return "Invalid Date";
    return dateObject.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading ticket details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.ticketTitle}>📌 {ticket.ticket.problem_type || 'Unknown Problem'}</Text>
      <Text style={styles.ticketDesc}>📝 {ticket.ticket.description || 'No description available'}</Text>
      <Text style={styles.ticketStatus}>📌 Status: {ticket.ticket.status || 'Unknown'}</Text>
      <Text style={styles.ticketDate}>📅 Opened On: {formatDate(ticket.ticket.created_at)}</Text>

      <Text style={styles.commentTitle}>💬 Comments</Text>
      <FlatList
        data={ticket.comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.commentUser}>👤 {item.username}:</Text>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.commentDate}>📅 {formatDate(item.created_at)}</Text>
          </View>
        )}
      />

      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
        <Text style={styles.commentButtonText}>➕ Add Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TicketDetailsScreen;
