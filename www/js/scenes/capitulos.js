class Capitulos extends Phaser.Scene {
    constructor() {
        super({ key: 'Capitulos' });
    }

    create() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        this.add.image(cx, cy, 'menu_bg').setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
        this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.85);

        this.add.text(cx, 70, t('chapters.title'), {
            fontSize: '46px', color: '#e0d8c8',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 6
        }).setOrigin(0.5);

        const capitulos = [
            { n: 1, titulo: t('chapters.chapter1'), sub: t('chapters.chapter1_sub') },
            { n: 2, titulo: t('chapters.chapter2'), sub: t('chapters.chapter2_sub') },
            { n: 3, titulo: t('chapters.chapter3'), sub: t('chapters.chapter3_sub') },
            { n: 4, titulo: t('chapters.chapter4'), sub: t('chapters.chapter4_sub') }
        ];

        const startY = 190;
        const spacing = 115;

        capitulos.forEach((cap, i) => {
            this.crearTarjetaCapitulo(cx, startY + i * spacing, cap);
        });

        const backBtn = this.add.text(cx, GAME_HEIGHT - 60, '← ' + t('common.back'), {
            fontSize: '24px', color: '#ffffff', fontFamily: 'Courier New',
            backgroundColor: '#444444',
            padding: { x: 16, y: 8 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        backBtn.on('pointerup', () => this.scene.start('Menu'));
    }

    crearTarjetaCapitulo(x, y, cap) {
        const desbloqueado = this.estaDesbloqueado(cap.n);
        const completado = this.estaCompletado(cap.n);
        const color = desbloqueado ? 0x2a4a6a : 0x1a1a1a;
        const colorBorde = desbloqueado ? 0x4a7aaa : 0x444444;

        const card = this.add.rectangle(x, y, 780, 95, color, desbloqueado ? 0.85 : 0.5)
            .setStrokeStyle(3, colorBorde, 1);

        this.add.text(x - 320, y, cap.n.toString(), {
            fontSize: '56px', color: desbloqueado ? '#ffffff' : '#555555',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(x - 250, y - 18, cap.titulo, {
            fontSize: '28px', color: desbloqueado ? '#ffffff' : '#666666',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0, 0.5);

        this.add.text(x - 250, y + 18, cap.sub, {
            fontSize: '20px', color: desbloqueado ? '#a0a0a0' : '#555555',
            fontFamily: 'Courier New', fontStyle: 'italic'
        }).setOrigin(0, 0.5);

        if (!desbloqueado) {
            this.add.text(x + 300, y, '🔒 ' + t('chapters.locked'), {
                fontSize: '18px', color: '#666666',
                fontFamily: 'Courier New', fontStyle: 'italic'
            }).setOrigin(1, 0.5);
        } else if (completado) {
            this.add.text(x + 300, y, '✓ ' + t('chapters.completed'), {
                fontSize: '18px', color: '#66aa66',
                fontFamily: 'Courier New', fontStyle: 'bold'
            }).setOrigin(1, 0.5);
        } else {
            this.add.text(x + 300, y, t('chapters.current'), {
                fontSize: '18px', color: '#c0a060',
                fontFamily: 'Courier New', fontStyle: 'italic'
            }).setOrigin(1, 0.5);
        }

        if (desbloqueado) {
            card.setInteractive({ useHandCursor: true });
            card.on('pointerover', () => card.setFillStyle(color, 1));
            card.on('pointerout', () => card.setFillStyle(color, 0.85));
            card.on('pointerup', () => this.iniciarCapitulo(cap.n));
        }
    }

    estaDesbloqueado(n) {
        if (n === 1) return true;
        const max = parseInt(localStorage.getItem('tc_capitulo') || '1');
        return n <= max;
    }

    estaCompletado(n) {
        const max = parseInt(localStorage.getItem('tc_capitulo') || '1');
        return n < max;
    }

    iniciarCapitulo(n) {
        if (n === 1) {
            if (!localStorage.getItem('tc_puzzle')) localStorage.setItem('tc_puzzle', '1');
            this.scene.start('Capitulo1');
        } else if (n === 2) {
            if (!localStorage.getItem('tc2_puzzle')) localStorage.setItem('tc2_puzzle', '1');
            this.scene.start('Capitulo2');
        } else {
            const cx = GAME_WIDTH / 2;
            const cy = GAME_HEIGHT / 2;
            const aviso = this.add.text(cx, cy, t('chapters.coming_soon'), {
                fontSize: '36px', color: '#c0a060',
                fontFamily: 'Courier New', fontStyle: 'italic',
                backgroundColor: '#000000',
                padding: { x: 30, y: 20 },
                stroke: '#000000', strokeThickness: 4
            }).setOrigin(0.5).setDepth(100);
            this.time.delayedCall(2500, () => aviso.destroy());
        }
    }
}