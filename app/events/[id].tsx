import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import HolidayNote from '../../src/components/HolidayNote';

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.retry}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data.find((e) => e.id === Number(id));
  

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Event not found' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.line}>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.line}>Date: {event.date}</Text>
      <Text style={styles.line}>Place: {event.place}</Text>
      <Text style={styles.line}>Seats: {event.seats}</Text>
              <Text style={styles.line}>Date: {event.date}</Text>
      <HolidayNote date={event.date} />
      <Text style={styles.line}>Place: {event.place}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  retry: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 8,
  },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 12 },
  line: { fontSize: 18, marginTop: 6 },
});