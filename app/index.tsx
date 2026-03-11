import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { theme } from '@/constants/theme';
import { db } from '@/services/firebase';

export default function HomeScreen() {
  const [nomPatient, setNomPatient] = useState('');
  const [adresseLivraison, setAdresseLivraison] = useState('');
  const [telephone, setTelephone] = useState('');
  const [medicament, setMedicament] = useState('');
  const [chauffeur, setChauffeur] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit =
    nomPatient.trim() && adresseLivraison.trim() && telephone.trim() && medicament.trim() && chauffeur.trim();

  const resetForm = () => {
    setNomPatient('');
    setAdresseLivraison('');
    setTelephone('');
    setMedicament('');
    setChauffeur('');
  };

  const handleCreateWaybill = async () => {
    if (!canSubmit || isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      await addDoc(collection(db, 'lettres_de_voiture'), {
        nomPatient: nomPatient.trim(),
        adresseLivraison: adresseLivraison.trim(),
        telephone: telephone.trim(),
        medicament: medicament.trim(),
        chauffeur: chauffeur.trim(),
        statut: 'A livrer',
        createdAt: serverTimestamp(),
      });

      Alert.alert('Succès', 'La lettre de voiture a été enregistrée dans Firebase.');
      resetForm();
    } catch (error) {
      Alert.alert('Erreur', "Impossible d'enregistrer la lettre de voiture.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Livraison de médicaments à domicile</Text>
          <Text style={styles.subtitle}>
            Complétez les informations ci-dessous pour générer votre lettre de voiture.
          </Text>

          <View style={styles.form}>
            <Input label="Nom du patient" value={nomPatient} onChangeText={setNomPatient} />
            <Input label="Adresse de livraison" value={adresseLivraison} onChangeText={setAdresseLivraison} multiline />
            <Input
              label="Téléphone"
              value={telephone}
              onChangeText={setTelephone}
              keyboardType="phone-pad"
              placeholder="06XXXXXXXX"
            />
            <Input label="Médicament(s)" value={medicament} onChangeText={setMedicament} multiline />
            <Input label="Chauffeur / livreur" value={chauffeur} onChangeText={setChauffeur} />

            <Pressable
              style={[styles.button, (!canSubmit || isLoading) && styles.buttonDisabled]}
              onPress={handleCreateWaybill}
              disabled={!canSubmit || isLoading}
            >
              <Text style={styles.buttonText}>{isLoading ? 'Enregistrement...' : 'Créer la lettre de voiture'}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: 'default' | 'phone-pad';
  placeholder?: string;
};

function Input({ label, value, onChangeText, multiline, keyboardType = 'default', placeholder }: InputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 8,
    marginBottom: 20,
  },
  form: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  field: {
    gap: 6,
  },
  label: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#D4DCF4',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  inputMultiline: {
    minHeight: 72,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  button: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
