class CodigoFenix extends Phaser.Scene {
    constructor() {
        super({ key: 'CodigoFenix' });
    }

    create() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        this.cameras.main.setBackgroundColor('#000000');
        this.yaTermino = false;
        this.audioIniciado = false;

        this.logo = this.add.image(cx, cy - 60, 'logo_codigo_fenix')
            .setDisplaySize(400, 400)
            .setAlpha(0)
            .setScale(0.8);

        this.texto = this.add.text(cx, cy + 220, 'CÓDIGO FÉNIX', {
            fontSize: '48px',
            color: '#c0a060',
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setAlpha(0);

        this.tagline = this.add.text(cx, cy + 275, 'Estudio de juegos indie', {
            fontSize: '20px',
            color: '#888888',
            fontFamily: 'Courier New',
            fontStyle: 'italic'
        }).setOrigin(0.5).setAlpha(0);

        this.tapText = this.add.text(cx, GAME_HEIGHT - 80, 'Toca para comenzar', {
            fontSize: '24px',
            color: '#888888',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.logo,
            alpha: 1,
            scale: 1,
            duration: 1200,
            ease: 'Power2'
        });

        this.tweens.add({
            targets: [this.texto, this.tagline],
            alpha: 1,
            duration: 1000,
            delay: 900
        });

        this.tweens.add({
            targets: this.tapText,
            alpha: 0.3,
            duration: 900,
            yoyo: true,
            repeat: -1
        });

        this.input.once('pointerup', () => {
            this.iniciarAudio();
        });
    }

    iniciarAudio() {
        if (this.audioIniciado) return;
        this.audioIniciado = true;

        if (this.sound.context && this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }

        if (this.cache.audio.exists('codigo_fenix')) {
            this.musica = this.sound.add('codigo_fenix', { volume: getVolumen() * 0.6 });
            this.musica.play();
        }

        this.tapText.destroy();

        this.time.delayedCall(4000, () => this.terminarIntro());

        this.input.once('pointerup', () => this.terminarIntro());
    }

    terminarIntro() {
        if (this.yaTermino) return;
        this.yaTermino = true;

        if (this.musica) {
            this.tweens.add({
                targets: this.musica,
                volume: 0,
                duration: 700
            });
            this.time.delayedCall(750, () => { if (this.musica) this.musica.stop(); });
        }

        this.cameras.main.fadeOut(700, 0, 0, 0);
        this.time.delayedCall(800, () => {
            if (localStorage.getItem('tc_intro_vista') === 'true') {
                this.scene.start('Menu');
            } else {
                this.scene.start('Presentacion');
            }
        });
    }
}