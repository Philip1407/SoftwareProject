import React, { Component } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width } = Dimensions.get("window");

class Activities extends Component {
    state = {
        active: "Today",
    };

    handleTab = tab => {
        // const { categories } = this.props;
        // const filtered = categories.filter(category =>
        //   category.tags.includes(tab.toLowerCase())
        // );

        this.setState({ active: tab });
    };

    renderTab(tab) {
        const { active } = this.state;
        const isActive = active === tab;

        return (
            <TouchableOpacity
                key={`tab-${tab}`}
                onPress={() => this.handleTab(tab)}
                style={[styles.tab, isActive ? styles.active : null]} >
                <Text size={16} medium center gray={!isActive} secondary={isActive}>
                    {tab}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { profile, navigation } = this.props;
        const tabs = ["Month", "Week", "Today"];

        return (
            <Block style={styles.container}>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>
                        Activities
                    </Text>
                </Block>
                <Block flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>
                <Block  padding={[0, theme.sizes.base * 2,0,theme.sizes.base * 2]} >
                    <Text style={styles.table} h1 bold>table</Text>
                </Block>
            </Block>
        );
    }
}


export default Activities;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
    },
    table:{
        backgroundColor: theme.colors.secondary
    },
    header: {
        paddingHorizontal: theme.sizes.base * 2
    },
    tabs: {
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2,
    },
    tab: {
        marginRight: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base,
        width:width/4
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3
    },
});
