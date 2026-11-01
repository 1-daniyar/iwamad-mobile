import { Pressable, StyleSheet, Text } from 'react-native';
import type { Event } from '../data/events';

type Props = {
  event: Event;
  saved?: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({ event, saved = false, onPress, onLongPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.date} · {event.place}
      </Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardPressed: {
    backgroundColor: '#dbeafe',
    borderColor: '#1d4ed8',
  },
  title: { fontSize: 18, fontWeight: '600' },
  meta: { fontSize: 14, color: '#4b5563', marginTop: 2 },
  saved: { fontSize: 14, color: '#b45309', marginTop: 4, fontWeight: '600' },
});
