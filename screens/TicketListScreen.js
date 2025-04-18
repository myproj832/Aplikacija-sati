import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTicketsForClient, assignTicket, closeTicket, getUserNameById } from './api';
import styles from './TicketListStyles';

const TicketListScreen = ({ navigation, route }) => {
  const { clientId, userId, companyId } = route.params;
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignedUsernames, setAssignedUsernames] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      fetchTickets();
    }, [])
  );

  /** ✅ Dohvatanje svih tiketa */
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await getTicketsForClient(clientId);

      if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        setTickets(response);
        fetchAssignedUsernames(response); // 🆕 Nakon dohvatanja tiketa, pokreni funkciju za preuzimanje imena
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch tickets.');
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Dohvatanje korisničkih imena za assigned user_id */
  const fetchAssignedUsernames = async (tickets) => {
    const usernames = { ...assignedUsernames };

    const uniqueUserIds = new Set();
    tickets.forEach(ticket => {
      if (ticket.assignedTo && !usernames[ticket.assignedTo]) {
        uniqueUserIds.add(ticket.assignedTo);
      }
    });

    for (const userId of uniqueUserIds) {
      try {
        const response = await getUserNameById(userId);
        if (!response.error) {
          usernames[userId] = response.username;
        } else {
          usernames[userId] = 'Not Assigned';
        }
      } catch (error) {
        console.error("❌ Error fetching username:", error);
      }
    }

    setAssignedUsernames(usernames);
  };

  /** ✅ Formatiranje datuma */
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

  /** ✅ Preuzimanje tiketa */
  const handleAssignTicket = async (ticketId) => {
    try {
      const response = await assignTicket(ticketId, userId);
      if (response.message) {
        Alert.alert('Success', response.message);
        fetchTickets();
      } else {
        Alert.alert('Error', response.error || 'Failed to assign ticket.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while assigning ticket.');
    }
  };

  /** ✅ Zatvaranje tiketa sa validacijom */
  const handleCloseTicket = async (ticket) => {
    if (!ticket.resolutionComment || ticket.resolutionComment.trim() === "No resolution yet"
    || ticket.resolutionComment.trim() === "Not yet") {
      Alert.alert("Error", "You cannot close a ticket without a resolution.");
      return;
    }

    if (!ticket.assignedTo || assignedUsernames[ticket.assignedTo] === "Not Assigned") {
      Alert.alert("Error", "You cannot close a ticket that is not assigned to someone.");
      return;
    }

    try {


      const response = await closeTicket(ticket.id);
      if (response.message) {
        Alert.alert("Success", "Ticket closed successfully.");
        fetchTickets();
      } else {
        Alert.alert("Error", response.error || "Failed to close ticket.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while closing the ticket.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8a2be2" />
        <Text style={styles.loadingText}>Loading tickets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets ?? []}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <View style={styles.ticketItem}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TicketDetails', { ticketId: item.id, userId })}
            >
              <Text style={styles.ticketTitle}>📌 {item.problemType || 'Unknown Problem'}</Text>
              <Text style={styles.ticketDesc}>{item.description || 'No description available'}</Text>
              <Text style={styles.ticketStatus}>Status: {item.status || 'Unknown'}</Text>
              <Text style={styles.ticketDate}>📅 {formatDate(item.createdAt)}</Text>
              <Text style={styles.ticketAssigned}>
                🛠 Assigned To: {assignedUsernames[item.assignedTo] || 'Not Assigned'}
              </Text>
            </TouchableOpacity>

            {/* 📌 Dodali smo ispis rešenja tiketa */}
            <View style={styles.resolutionContainer}>
              <Text style={styles.resolutionText}>
                📝 Resolution: {item.resolutionComment || 'No resolution yet'}
              </Text>

              {/* 📝 Dugme za unos ili izmenu rešenja */}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditResolution', { ticketId: item.id })}
              >
                <Text style={styles.buttonText}>✏️</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ticketActions}>
              <TouchableOpacity
                style={styles.assignButton}
                onPress={() => handleAssignTicket(item.id)}
              >
                <Text style={styles.buttonText}>🛠 Assign</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handleCloseTicket(item)} // 🆕 Prosleđujemo ceo tiket
              >
                <Text style={styles.buttonText}>✅ Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTicket', { userId, clientId, companyId })}
      >
        <Text style={styles.addButtonText}>➕ Report an Issue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TicketListScreen;
