import { Pressable, StyleSheet, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type Props = {
  event: CampusEvent;
  saved?: boolean;
  onPress: () => void;
  onLongPress: () => void;
  onToggleSaved: () => void;
};

export default function EventRow({
  event,
  saved = false,
  onPress,
  onLongPress,
  onToggleSaved,
}: Props) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>
            {event.date} · {event.place}
          </Text>
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
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
  action: {
    minHeight: 44,
    width: 88,
    marginBottom: 10,
    marginLeft: 8,
    borderRadius: 10,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});