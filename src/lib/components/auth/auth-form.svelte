<script lang="ts">
  import * as Alert from '$lib/components/ui/alert';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { userAuthSchema, type UserAuthSchema } from '$lib/schema/userAuthSchema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  // https://icones.js.org/collection/heroicons
  import Icon from '~icons/heroicons/exclamation-circle';

  export let data: SuperValidated<Infer<UserAuthSchema>>;

  const form = superForm(data, {
    validators: zodClient(userAuthSchema),
  });

  const { form: formData, enhance, errors } = form;
</script>

<form method="POST" class="w-2/3 space-y-6" use:enhance>
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$formData.email} type="email" />
    </Form.Control>
    <Form.Description>Email address.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>Password</Form.Label>
      <Input {...attrs} bind:value={$formData.password} type="password" />
    </Form.Control>
    <Form.Description>Your password.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  {#if $errors._errors}
    <Alert.Root variant="destructive">
      <Icon class="h-4 w-4" />
      <Alert.Title>Error</Alert.Title>
      <Alert.Description>{$errors._errors}</Alert.Description>
    </Alert.Root>
  {/if}

  <Form.Button>Submit</Form.Button>
</form>
