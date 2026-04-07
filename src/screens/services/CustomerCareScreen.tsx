import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { ChatMessage } from '../../types/models';

const QUICK_TOPICS = [
  'Booking Help',
  'Payment Issue',
  'Technical Support',
  'Visa Inquiry',
  'Lost Item',
  'Accessibility',
];

const BOT_REPLIES: Record<string, string> = {
  'Booking Help': "I can help with your bookings! Could you share your booking confirmation number or describe the issue you're experiencing?",
  'Payment Issue': 'For payment issues, please share your transaction ID. Our team will verify and resolve it within 24 hours. If urgent, dial +966 11 000 0000.',
  'Technical Support': "I'm here to help with technical issues. Please describe the problem — for example, app crashes, login issues, or missing features.",
  'Visa Inquiry': 'For Saudi tourist visa inquiries, visit the Visa & Package section under Services. I can also guide you through the e-Visa application process.',
  'Lost Item': 'We\'re sorry to hear about your lost item. Please describe the item and the last location where you had it, and we\'ll coordinate with the relevant venue.',
  'Accessibility': 'Explore Saudi is committed to accessibility. Please tell me what assistance you need and I\'ll connect you with the right support.',
};

const BOT_DEFAULT_REPLIES = [
  "Thank you for reaching out! I'm here to help. Could you tell me more about your concern?",
  "I understand. Let me look into that for you. Can you provide more details?",
  "That's a great question! Our team handles this regularly. Here's what I recommend…",
  "I appreciate your patience. I'll make sure this is resolved as quickly as possible.",
];

function getBotReply(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, reply] of Object.entries(BOT_REPLIES)) {
    if (lower.includes(key.toLowerCase())) return reply;
  }
  return BOT_DEFAULT_REPLIES[Math.floor(Math.random() * BOT_DEFAULT_REPLIES.length)];
}

export default function CustomerCareScreen() {
  const navigation = useNavigation<any>();
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'bot_0',
      text: "👋 Hello! I'm Sara, your Explore Saudi virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        text: getBotReply(text),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 1500);
  };

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isTyping]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>🎧</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Customer Care</Text>
            <Text style={styles.headerOnline}>● Online</Text>
          </View>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Quick topics */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topicsBar}
      >
        {QUICK_TOPICS.map((topic) => (
          <TouchableOpacity
            key={topic}
            style={styles.topicChip}
            onPress={() => sendMessage(topic)}
          >
            <Text style={styles.topicText}>{topic}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messages}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.msgRow,
                msg.sender === 'user' ? styles.msgRowUser : styles.msgRowBot,
              ]}
            >
              {msg.sender === 'bot' && (
                <View style={styles.msgBotAvatar}>
                  <Text style={{ fontSize: 14 }}>🎧</Text>
                </View>
              )}
              <View
                style={[
                  styles.bubble,
                  msg.sender === 'user' ? styles.bubbleUser : styles.bubbleBot,
                ]}
              >
                <Text style={[styles.bubbleText, msg.sender === 'user' && styles.bubbleTextUser]}>
                  {msg.text}
                </Text>
                <Text style={[styles.bubbleTime, msg.sender === 'user' && styles.bubbleTimeUser]}>
                  {msg.timestamp}
                </Text>
              </View>
            </View>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <View style={[styles.msgRow, styles.msgRowBot]}>
              <View style={styles.msgBotAvatar}>
                <Text style={{ fontSize: 14 }}>🎧</Text>
              </View>
              <View style={styles.typingBubble}>
                <Text style={styles.typingDots}>• • •</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message…"
            placeholderTextColor={colors.slate}
            multiline
            onSubmitEditing={() => sendMessage(input)}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.pearl },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.white, ...shadows.sm,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, color: colors.charcoal, lineHeight: 34 },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  botAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#e53e3e', alignItems: 'center', justifyContent: 'center',
  },
  botAvatarText: { fontSize: 18 },
  headerTitle: { fontSize: typography.sizes.md, fontWeight: '700', color: colors.charcoal },
  headerOnline: { fontSize: typography.sizes.xs, color: '#2fba89', fontWeight: '600' },
  topicsBar: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.xs },
  topicChip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    backgroundColor: colors.white, borderRadius: borderRadius.full ?? 100,
    borderWidth: 1, borderColor: colors.pearl, marginRight: spacing.xs,
  },
  topicText: { fontSize: typography.sizes.sm, fontWeight: '600', color: colors.charcoal },
  messages: { padding: spacing.md, gap: spacing.sm },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: spacing.sm },
  msgRowUser: { justifyContent: 'flex-end' },
  msgRowBot: { justifyContent: 'flex-start' },
  msgBotAvatar: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#e53e3e', alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.xs, flexShrink: 0,
  },
  bubble: {
    maxWidth: '75%', borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
  },
  bubbleUser: { backgroundColor: colors.sand, borderBottomRightRadius: 4 },
  bubbleBot: { backgroundColor: colors.white, borderBottomLeftRadius: 4, ...shadows.sm },
  bubbleText: { fontSize: typography.sizes.sm, color: colors.charcoal, lineHeight: 20 },
  bubbleTextUser: { color: colors.white },
  bubbleTime: { fontSize: 10, color: colors.slate, marginTop: 4, textAlign: 'right' },
  bubbleTimeUser: { color: 'rgba(255,255,255,0.7)' },
  typingBubble: {
    backgroundColor: colors.white, borderRadius: borderRadius.lg, borderBottomLeftRadius: 4,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, ...shadows.sm,
  },
  typingDots: { fontSize: typography.sizes.lg, color: colors.slate, letterSpacing: 3 },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.pearl,
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: colors.pearl, borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md, paddingVertical: 10,
    fontSize: typography.sizes.sm, color: colors.charcoal,
    maxHeight: 100, marginRight: spacing.sm,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.sand, alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: colors.pearl },
  sendIcon: { fontSize: 18, color: colors.white },
});
