import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/theme';
import Header from './Header';

const SkeletonLoader = () => {
    const shimmerEffect: any = {
        from: { opacity: 0.5 },
        animate: { opacity: 1 },
        transition: { type: 'timing', duration: 1050, loop: true, repeatReverse: true },
    }
    return (
        <View>
            <View style={{ width: 450, height: 1, borderWidth: 0.1, backgroundColor: colors.grey, marginTop: 10 }} />
            <View style={styles.card}>
                <View style={styles.header}>
                    <MotiView transition={{
                        type: 'timing',
                    }} style={[styles.avatar, shimmerEffect]} />
                    <View style={styles.headerText}>
                        <MotiView style={[styles.title, shimmerEffect]} />
                        <MotiView style={[styles.subTitle, shimmerEffect]} />
                    </View>
                    <MotiView style={[styles.dot, shimmerEffect]} />
                </View>
                <MotiView style={[styles.description, shimmerEffect]} />
                <MotiView style={[styles.tag, shimmerEffect]} />
                <MotiView style={[styles.image, shimmerEffect]} />
                <View style={styles.actions}>
                    <MotiView style={[styles.tag, shimmerEffect]} />
                </View>
            </View>
        </View>
    );
};
export default React.memo(SkeletonLoader);

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#ddd',
    },
    headerText: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        width: 96,
        height: 20,
        backgroundColor: '#ddd',
        borderRadius: 4,
    },
    subTitle: {
        marginTop: 6,
        width: 40,
        height: 14,
        backgroundColor: '#ddd',
        borderRadius: 4,
    },
    dot: {
        width: 20,
        height: 20,
        backgroundColor: '#ddd',
        borderRadius: 10,
    },
    description: {
        marginTop: 12,
        width: 246,
        height: 14,
        backgroundColor: '#ddd',
        borderRadius: 4,
    },
    tag: {
        marginTop: 6,
        width: 358,
        height: 14,
        backgroundColor: '#ddd',
        borderRadius: 4,
    },
    image: {
        marginTop: 12,
        width: 370,
        height: 252,
        backgroundColor: '#ddd',
        borderRadius: 20,
    },
    actions: {
        flexDirection: 'row',
        marginTop: 16,
    },
    actionIcon: {
        width: 24,
        height: 24,
        backgroundColor: '#ddd',
        borderRadius: 12,
        marginRight: 16,
    },
});

