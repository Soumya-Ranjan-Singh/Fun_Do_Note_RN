/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

const ImageOpenerModal = props => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
        hardwareAccelerated>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={1}
          onPress={() => props.hideModal()}>
          <View
            style={styles.modal_container}>
            <TouchableOpacity
              onPress={props.onPressOpenCamera}
              style={styles.modalBtn}>
              <Text style={styles.btn_text}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onPressOpenGallery}
              style={styles.modalBtn}>
              <Text style={styles.btn_text}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ImageOpenerModal;

const styles = StyleSheet.create({
  modal_container:{
    width: 250,
    height: 130,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 20,
  },
  modalBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  btn_text: {
    fontSize: 15,
    margin: 10,
  },
});
