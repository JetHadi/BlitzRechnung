<script lang="ts">
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    
    interface RechnungsPosition {
      bezeichnung: string;
      anzahl: number;
      einheit: string;
      einheitspreis: number;
      ustProzent: number;
      ust: number;
      gesamt: number;
    }
  
    // Example data
    let positionen: RechnungsPosition[] = [
      {
        bezeichnung: "Webentwicklung",
        anzahl: 10,
        einheit: "Std",
        einheitspreis: 95.00,
        ustProzent: 19,
        ust: 180.50,
        gesamt: 1130.50
      }
    ];
  
    // Format number as German currency
    const formatCurrency = (value: number) => {
      return value.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR'
      });
    };
  
    // Format number as German percentage
    const formatPercent = (value: number) => {
      return value.toLocaleString('de-DE', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    };
  </script>
  
  <div class="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow class="bg-muted/50">
          <TableHead class="w-[300px]">Bezeichnung</TableHead>
          <TableHead class="text-right">Anzahl</TableHead>
          <TableHead class="text-right">Einheit</TableHead>
          <TableHead class="text-right">Einheitspreis</TableHead>
          <TableHead class="text-right">USt. %</TableHead>
          <TableHead class="text-right">USt.</TableHead>
          <TableHead class="text-right">Gesamt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each positionen as position}
          <TableRow>
            <TableCell class="font-medium">{position.bezeichnung}</TableCell>
            <TableCell class="text-right">{position.anzahl}</TableCell>
            <TableCell class="text-right">{position.einheit}</TableCell>
            <TableCell class="text-right">{formatCurrency(position.einheitspreis)}</TableCell>
            <TableCell class="text-right">{formatPercent(position.ustProzent/100)}</TableCell>
            <TableCell class="text-right">{formatCurrency(position.ust)}</TableCell>
            <TableCell class="text-right font-medium">{formatCurrency(position.gesamt)}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>
  