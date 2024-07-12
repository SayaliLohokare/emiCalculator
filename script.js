function calculateEMI() {
    const amount = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('rate').value);
    let tenure = parseFloat(document.getElementById('tenure').value);

    const tenureType = document.querySelector('input[name="tenure-type"]:checked').value;
    if (tenureType === 'years') {
        tenure = tenure * 12; // Convert years to months
    }

    if (isNaN(amount) || isNaN(rate) || isNaN(tenure)) {
        alert('Please enter valid values');
        return;
    }

    // Convert annual interest rate to monthly and percentage to decimal
    const monthlyRate = (rate / 100) / 12;

    // EMI formula
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);

    const emiResult = document.getElementById('emi-result');
    const totalInterest = emi * tenure - amount;
    const totalPayment = emi * tenure;
    emiResult.innerHTML = `Your monthly EMI is: ₹ ${emi.toFixed(2)}`;
    document.getElementById('total-interest').innerHTML = `Total interest payable: ₹ ${totalInterest.toFixed(2)}`;
    document.getElementById('total-payment').innerHTML = `Total payment (Principal + Interest): ₹ ${totalPayment.toFixed(2)}`;

    const emiTable = document.getElementById('emi-table-body');
    emiTable.innerHTML = '';

    let remainingBalance = amount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;

    for (let i = 0; i < tenure; i++) {
        const interest = remainingBalance * monthlyRate;
        const principal = emi - interest;
        remainingBalance -= principal;
        totalInterestPaid += interest;
        totalPrincipalPaid += principal;

        const row = document.createElement('tr');
        const yearCell = document.createElement('td');
        const principalCell = document.createElement('td');
        const interestCell = document.createElement('td');
        const totalPaymentCell = document.createElement('td');
        const balanceCell = document.createElement('td');
        const loanPaidCell = document.createElement('td');

        yearCell.textContent = Math.floor(i / 12) + 1;
        principalCell.textContent = principal.toFixed(2);
        interestCell.textContent = interest.toFixed(2);
        totalPaymentCell.textContent = emi.toFixed(2);
        balanceCell.textContent = remainingBalance.toFixed(2);
        loanPaidCell.textContent = ((amount - remainingBalance) / amount * 100).toFixed(2) + '%';

        row.appendChild(yearCell);
        row.appendChild(principalCell);
        row.appendChild(interestCell);
        row.appendChild(totalPaymentCell);
        row.appendChild(balanceCell);
        row.appendChild(loanPaidCell);

        emiTable.appendChild(row);
    }

    // Update the footer with totals
    document.getElementById('total-interest-cell').textContent = totalInterestPaid.toFixed(2);
    document.getElementById('total-payment-cell').textContent = (totalInterestPaid + totalPrincipalPaid).toFixed(2);
}
