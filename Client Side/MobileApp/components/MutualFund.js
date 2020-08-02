import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function MutualFund() {
    state =
        [{ "ISIN": "", "Record_Date": "", "Maturity_Date": "" }]

    const [corporateAction, setcorporateAction] = useState(state)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        load()
    }, [])


    async function load() {
        setErrorMessage(null)
        try {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch('http://35.154.254.195:5000/table/mutualfunds', requestOptions)
                .then(response => response.json())
                .then(data => setcorporateAction(data));

        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    //alert(corporateAction.cas[0].ISIN)
    return (
        <Fragment>
            <ScrollView>
                <View style={styles.headingBox}>
                    <Text style={styles.heading}>Mutual Funds</Text>
                </View>
                {corporateAction.map((res) => (
                    <View style={styles.actionDetails}>
                        <View style={styles.actionDetailsRow}>
                            <View style={styles.actionDetailsBox}>
                                <View style={styles.actionDetailsRow}>
                                    <View style={styles.actionDetailsItems}>
                                        <Text>ISIN Number :</Text>
                                        <Text style={styles.textSecondary}>{res.ISIN}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ ...styles.actionDetailsRow, borderTopWidth: 1, }}>
                            <View style={{ ...styles.actionDetailsBox, borderRightWidth: 1 }}>
                                <View style={styles.actionDetailsRow}>
                                    <View style={styles.actionDetailsItems}>
                                        <Text>Record Date :</Text>
                                        <Text style={styles.textSecondary}>{res.Record_Date}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.actionDetailsBox}>
                                <View style={styles.actionDetailsRow}>
                                    <View style={styles.actionDetailsItems}>
                                        <Text>Maturity Date :</Text>
                                        <Text style={styles.textSecondary}>{res.Maturity_Date}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </Fragment>

    )
}

const styles = StyleSheet.create({
    actionDetails: {
        margin: 15,
        borderWidth: 1,
        borderRadius: 10,
    },
    actionDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actionDetailsBox: {
        flex: 1,
        padding: 10,
    },
    actionDetailsItems: {

    },
    textSecondary: {
        fontSize: 15,
        fontWeight: '700',
        margin: 7,
    },
    heading: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700',
    },
    headingBox: {
        margin: 30
    }
})
